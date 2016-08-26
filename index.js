var express = require('express'),
    bodyParser = require('body-parser'),
    views = require('./views'),
    crypto = require('crypto');

var app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const CLIENT_ID = 'b7804330d26afc584231';
const CLIENT_SECRET = '2686b85cc510667d916da73dba2567b26da750316ecacb7362b0ecc79f19';
const AF_URL = 'http://bd9:5000';
const BASE_URL = 'http://localhost:3000'

var egHTML = (vars) => `<!DOCTYPE html>
<html>
  <head><title>Oauth App</title></head>
  <body>
    <div style="text-align: center; padding-top: 10px">
      <p>I'm an authroized app!</p>
      <p>Token: ${vars.token}</p>
      <script>parent.postMessage("loaded", '*')</script>
    </div>
  </body>
</html>`;

app.get('/', (req, res) => res.send('Hello, world!'));

app.post('/canvas', function(req, res, next) {
    if (req.body.signed_request) {

        var base64data = req.body.signed_request.split('.', 2),
            encodedSig = base64data[0],
            payload = base64data[1];

        try {
            var dataStr = new Buffer(payload, 'base64').toString('ascii');
            var data = JSON.parse(dataStr)
            var expectedSig = crypto.createHmac('sha256', CLIENT_SECRET).update(payload).digest('hex');

            if (encodedSig !== expectedSig) {
                res.send("Bad data");
                return;
            }

            res.send(egHTML({ token: data.oauth_token }));
            return;

        } catch(e) {
            res.send('Could not decode request');
            return;
        }
    }

    res.send('No signed request detected');
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}.`));
