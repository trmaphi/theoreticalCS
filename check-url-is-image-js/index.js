const https = require('https');

function isURLimage(url, cb) {  
  https.request(url, {
    'method': 'HEAD',
    'maxRedirects': 1
  }, function (res) {
    res.on('error', function (error) {
      cb(error);
    });
  
    cb(null, res.headers["content-type"].startsWith('image'));
  }).end();
}

isURLimage('https://google.com', (err, isURLimage) => {
  if(err) {
    console.error(err);
    return;
  }
  console.log(isURLimage);
});


