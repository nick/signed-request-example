# Example OAuth app

This example takes a signed_request body and displays an auth token.

## Installation

1. Sign up with Heroku
2. Install the [Heroku toolbelt](https://devcenter.heroku.com/articles/heroku-command-line)
3. Clone this repo and push to heroku

    git clone https://github.com/nick/signed-request-example.git
    cd signed-request-example
    heroku create
    git push heroku master

4. Create your Developer Application using the new URI provided by Heroku.
5. Enter your new client ID and Secret as Heroku environment variables:

    heroku config set CLIENT_ID=abc123 CLIENT_SECRET=def456
