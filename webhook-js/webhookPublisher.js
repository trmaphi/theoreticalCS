const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const PORT = 8081;
const app = express();

const subcriberUrls = [];

app.use(bodyParser.json({ extended: true }));

// Add subcribers url to notify on event being triggered
app.post('/webhook/', (req, res) => {
    console.log(req.body);
    subcriberUrls.push(new URL(req.body.url));
    console.log('NEW WEBHOOK SUBCRIBER');
    console.log(subcriberUrls);
    res.status(200).send();
});

// Notify event to subcriber
app.post('/event', (req, res) => {
    const notifyReq = http.request(
        subcriberUrls[0].href,
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
    console.log(`Listening new subcriber and event on port ${PORT}`);
});
