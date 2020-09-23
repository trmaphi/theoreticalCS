# DynamoDB cloud native incremental counter
----------

## Create table for counter

```bash
aws dynamodb create-table --cli-input-json file://dynamodb-incremental-counter/incremental-counter.json --endpoint-url http://localhost:8000
{
    "Attributes": {
        "CreationDateTime": "2020-09-23T23:35:02.649000+07:00",
        "ProvisionedThroughput": {
            "LastIncreaseDateTime": "1970-01-01T07:00:00+07:00",
            "LastDecreaseDateTime": "1970-01-01T07:00:00+07:00",
            "NumberOfDecreasesToday": 0,
            "ReadCapacityUnits": 1,
            "WriteCapacityUnits": 1
        },
        "TableSizeBytes": 0,
        "ItemCount": 0,
        "TableArn": "arn:aws:dynamodb:ddblocal:000000000000:table/Counter"
    }
}
```

## Update and get the last counter item value

```bash
aws dynamodb update-item --cli-input-json file://dynamodb-incremental-counter/update-and-get-current-value-counter.json --endpoint-url http://localhost:8000
{
    "Attributes": {
        "CounterEntity": {
            "S": "Entity"
        },
        "currentValue": {
            "N": "1"
        }
    }
}
```
