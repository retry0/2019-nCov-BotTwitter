# 2019-nCov
[Twitter](https://twitter.com/Linggaadi4)

A simple BOT App to get the latest information about the corona virus that is spreading in Indonesia and world, bot send data only always 23 hours

## Prerequisites
- Twitter developer App and its corresponding consumer key/secret and access token key/secret (you can used your account twitter )
- Redis

## Setup  Token Twitter
- Go to `https://dev.twitter.com/apps`
- Create App(fill up the form)
- Change Permissions if necessary(depending if you want to just read,write or execute) 
- Go To API keys section and click generate ACCESS TOKEN.
 Reference `http://www.technocratsid.com/getting-twitter-consumer-api-access-token-keys/`

## Deploy
-- Heroku
Reference `https://www.freecodecamp.org/news/how-to-deploy-a-node-application-and-database-to-heroku/`

## Usage
Install dependencies:
```bash
npm install
```

Run application:
```bash
node index.js
```
## API 
Source data from: [https://thewuhanvirus.com/](https://thewuhanvirus.com/)