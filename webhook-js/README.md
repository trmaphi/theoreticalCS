Simple webhook example in node.js

# Install dependencies

```bash
# Install dependencies based on package-lock.json
npm ci
```

# Run webhook example

```bash
# Start subcriber server
npm run start:subcriber

# Open new terminal tab/window/panel
# Start publisher server
npm run start:publisher

# Open new terminal tab/window/panel
# Subcribe to event trigger
http POST http://localhost:8081/webhook url=http://localhost:8080/eventEmit

# Trigger event
http POST http://localhost:8081/event name=phi

# Log shown up in subcriber server
```

Example of log:

```
eventEmit payload { name: 'phi' }
```
