const request = require('request');
const credentials = require('./credentials');

class Auth {
  authTwitter() {
    const token = `${credentials.TWITTER.key}:${credentials.TWITTER.secret}`;
    const buffer = Buffer.from(token, 'ascii');
    const encoded = buffer.toString('base64');
    const options = {
      url: 'https://api.twitter.com/oauth2/token',
      method: 'post',
      headers: {
        Authorization: `Basic ${encoded}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: 'grant_type=client_credentials'
    };

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        const data = JSON.parse(body);
        const {access_token} = data;

        resolve({twitterToken: access_token});
      });
    });
  }

  init() {
    return this.authTwitter();
  }
}

module.exports = Auth;
