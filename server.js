const fs = require('fs');
const https = require('https');
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
    .use(express.static('src'))
    .use(express.static('node_modules'))
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
      })
    })
    .listen(8090);
});


