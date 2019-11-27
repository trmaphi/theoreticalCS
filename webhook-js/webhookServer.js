const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const PORT = 8081;
const app = express();

const urls = [];

app.use(bodyParser.json({ extended: true }));

app.post('/webhook/', (req, res) => {
    urls.push(new URL(req.body.url));
    console.log('NEW WEBHOOK');
    console.log(urls);
    res.status(200).send();
});

app.post('/event', (req, res) => {
    const notifyReq = http.request(
        urls[0].href,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(req.body).length,
            }
        }, () => {
            res.status(200).send('SUCCESS TRIGGER EVENT');
        })
        .on('error', (err) => {
            res.status(500).send(err);
        })

    notifyReq.write(JSON.stringify(req.body));
    notifyReq.end();
})

app.listen(PORT, () => {
    console.log(`Listening for webhooks on port ${PORT}`);
});
