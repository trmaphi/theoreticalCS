'use strict';

const express = require('express');
const {
  ApolloServer,
  ApolloError,
} = require('apollo-server-express');
const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');
const {
  nodeDefinitions,
  globalIdField,
  fromGlobalId,
  connectionFromArray,
  connectionArgs,
  connectionDefinitions,
  mutationWithClientMutationId
} = require('graphql-relay');

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

/**
 * Using our shorthand to describe type systems, the type system for our
 * example will be the following:
 *
 * interface Node {
 *   id: ID!
 * }
 *
 * type Faction : Node {
 *   id: ID!
 *   name: String
 *   ships: ShipConnection
 * }
 *
 * type Ship : Node {
 *   id: ID!
 *   name: String
 * }
 *
 * type ShipConnection {
 *   edges: [ShipEdge]
 *   pageInfo: PageInfo!
 * }
 *
 * type ShipEdge {
 *   cursor: String!
 *   node: Ship
 * }
 *
 * type PageInfo {
 *   hasNextPage: Boolean!
 *   hasPreviousPage: Boolean!
 *   startCursor: String
 *   endCursor: String
 * }
 *
 * type Query {
 *   rebels: Faction
 *   empire: Faction
 *   node(id: ID!): Node
 * }
 *
 * input IntroduceShipInput {
 *   clientMutationId: string
 *   shipName: string!
 *   factionId: ID!
 * }
 *
 * type IntroduceShipPayload {
 *   clientMutationId: string
 *   ship: Ship
 *   faction: Faction
 * }
 *
 * type Mutation {
 *   introduceShip(input: IntroduceShipInput!): IntroduceShipPayload
 * }
 */

/**
 * We get the node interface and field from the relay library.
 *
 * The first method is the way we resolve an ID to its object. The second is the
 * way we resolve an object that implements node to its type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Faction') {
      return getFaction(id);
    }
    if (type === 'Ship') {
      return getShip(id);
    }
  },
  obj => {
    return obj.ships ? factionType : shipType;
  }
);

/**
 * We define our basic ship type.
 *
 * This implements the following type system shorthand:
 *   type Ship : Node {
 *     id: String!
 *     name: String
 *   }
 */
const shipType = new GraphQLObjectType({
  name: 'Ship',
  description: 'A ship in the Star Wars saga',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      type: GraphQLString,
      description: 'The name of the ship.',
    },
  }),
});

/**
 * We define a connection between a faction and its ships.
 *
 * connectionType implements the following type system shorthand:
 *   type ShipConnection {
 *     edges: [ShipEdge]
 *     pageInfo: PageInfo!
 *   }
 *
 * connectionType has an edges field - a list of edgeTypes that implement the
 * following type system shorthand:
 *   type ShipEdge {
 *     cursor: String!
 *     node: Ship
 *   }
 */
const { connectionType: shipConnection } = connectionDefinitions({
  nodeType: shipType,
});

/**
 * We define our faction type, which implements the node interface.
 *
 * This implements the following type system shorthand:
 *   type Faction : Node {
 *     id: String!
 *     name: String
 *     ships: ShipConnection
 *   }
 */
const factionType = new GraphQLObjectType({
  name: 'Faction',
  description: 'A faction in the Star Wars saga',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      type: GraphQLString,
      description: 'The name of the faction.',
    },
    ships: {
      type: shipConnection,
      description: 'The ships used by the faction.',
      args: connectionArgs,
      resolve: (faction, args) =>
        connectionFromArray(faction.ships.map(getShip), args),
    },
  }),
});

/**
 * This is the type that will be the root of our query, and the
 * entry point into our schema.
 *
 * This implements the following type system shorthand:
 *   type Query {
 *     rebels: Faction
 *     empire: Faction
 *     node(id: String!): Node
 *   }
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    rebels: {
      type: factionType,
      resolve: () => getRebels(),
    },
    empire: {
      type: factionType,
      resolve: () => getEmpire(),
    },
    node: nodeField,
  }),
});

/**
 * This will return a GraphQLFieldConfig for our ship
 * mutation.
 *
 * It creates these two types implicitly:
 *   input IntroduceShipInput {
 *     clientMutationId: string
 *     shipName: string!
 *     factionId: ID!
 *   }
 *
 *   type IntroduceShipPayload {
 *     clientMutationId: string
 *     ship: Ship
 *     faction: Faction
 *   }
 */
const shipMutation = mutationWithClientMutationId({
  name: 'IntroduceShip',
  inputFields: {
    shipName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    factionId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    ship: {
      type: shipType,
      resolve: payload => getShip(payload.shipId),
    },
    faction: {
      type: factionType,
      resolve: payload => getFaction(payload.factionId),
    },
  },
  mutateAndGetPayload: ({ shipName, factionId }) => {
    const newShip = createShip(shipName, factionId);
    return {
      shipId: newShip.id,
      factionId,
    };
  },
});

/**
 * This is the type that will be the root of our mutations, and the
 * entry point into performing writes in our schema.
 *
 * This implements the following type system shorthand:
 *   type Mutation {
 *     introduceShip(input IntroduceShipInput!): IntroduceShipPayload
 *   }
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    introduceShip: shipMutation,
  }),
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
const StarWarsSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

const server = new ApolloServer({
  schema: StarWarsSchema,
  formatError: (err) => {
    return new ApolloError('INTERNAL SERVER ERROR')
  },
});

const app = express();
server.applyMiddleware({ app });

const PORT = 4000;

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);
