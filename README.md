# Example OAuth app

This example takes a signed_request body and displays an auth token.

## Installation

* Sign up with [Heroku](https://signup.heroku.com/)
* Install the [Heroku toolbelt](https://devcenter.heroku.com/articles/heroku-command-line)
* Clone this repo and push to Heroku:
```
git clone https://github.com/nick/signed-request-example.git
cd signed-request-example
heroku create
git push heroku master
```
* Create your Developer Application using the new URI provided by Heroku.
* Enter your new Client ID and Secret as Heroku environment variables:
```
heroku config set CLIENT_ID=abc123 CLIENT_SECRET=def456
```
