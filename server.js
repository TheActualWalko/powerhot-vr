const express = require('express');
const bodyParser = require('body-parser');
const Auth = require('./auth');
const request = require('request');

const app = express();
const auth = new Auth();

auth.init().then(tokens => {
  const {twitterToken} = tokens;

  app
  .use(bodyParser.json())
  .use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://10.0.0.235:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  })
  .use('/social', (req, res, next) => {
    const {query} = req;
    const {keys} = query;

    request({
      url: `https://api.twitter.com/1.1/search/tweets.json?q=${keys}&src=typd`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${twitterToken}`
      }
    }, (e, r, body) => {
      const json = JSON.parse(body);
      const data = json.statuses ? json.statuses.map(obj => {
        const {created_at, text, user} = obj;
        const {profile_image_url, screen_name} = user;

        return {
          date: created_at,
          text,
          name: screen_name,
          profileImage: profile_image_url
        };
      }) : {};


      res.send(JSON.stringify(data));
    });
  })
  .listen(8080)
});

