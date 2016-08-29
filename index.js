var express = require('express'),
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.get('/', (req, res) => res.send('Hello, world!'));

app.post('/canvas', function(req, res, next) {

    if (!req.body.signed_request) {
        return res.send('No signed request detected');
    }

    var [encodedSig, payload] = req.body.signed_request.split('.', 2);

    try {
        var dataStr = new Buffer(payload, 'base64').toString('ascii');
        var data = JSON.parse(dataStr)
        var expectedSig = crypto.createHmac('sha256', CLIENT_SECRET).update(payload).digest('hex');

        if (encodedSig !== expectedSig) {
            return res.send("Bad data");
        }
    } catch(e) {
        return res.send('Could not decode request');
    }

    res.send(HTML(data));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}.`));

const HTML = (data) => `<!DOCTYPE html>
<html>
  <head><title>Exaple OAuth App</title></head>
  <body>
    <div style="text-align: center; padding-top: 10px">
      <p>I'm an authroized app!</p>
      <p>Token: ${data.oauth_token}</p>
      <script>parent.postMessage("loaded", '*')</script>
    </div>
  </body>
</html>`;
