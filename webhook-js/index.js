const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8080;

const app = express();

app.use(bodyParser.json({ extended: true }));

app.use('/eventEmit', (req, res) => {
    console.log('eventEmit payload', req.body);
    res.status(200).send(req.body);
});

app.listen(PORT, () => {
    console.log(`Listen payload`);
});
