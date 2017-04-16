require('dotenv').config();

module.exports = {
  expressPort: parseInt(process.env.SERVER_API_PORT) || 8080,
  domain: process.env.SERVER_API_DOMAIN || ('http://localhost:' + (process.env.SERVER_API_PORT || 8080) + '/'),
  oauth: {
    clientID: '569862257791-vufscnbp8dc8hiu5tu6923iqg0eue2ht.apps.googleusercontent.com',
    clientSecret: 'z5LtZhN_zLSeehnGwu49-HcX',
    callbackURL: "http://localhost:8080/oauth"
  }
};
