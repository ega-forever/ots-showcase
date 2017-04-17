/**
 * @type {config}
 * @description base config for the whole app
 */

require('dotenv').config();

module.exports = {
  expressPort: parseInt(process.env.SERVER_API_PORT) || 8080,
  domain: process.env.SERVER_API_DOMAIN || (`http://localhost:${process.env.SERVER_API_PORT || 8080}/`),
  oauth: {
    clientID: process.env.OAUTH_CLIENT_ID || '569862257791-vufscnbp8dc8hiu5tu6923iqg0eue2ht.apps.googleusercontent.com',
    clientSecret: process.env.OAUTH_CLIENT_SECRET || 'z5LtZhN_zLSeehnGwu49-HcX',
    callbackURL: process.env.OAUTH_CALLBACK_URL || "http://localhost:8080/oauth"
  },
  database: {
    uri: process.env.DB_URI || 'mysql://root:root@localhost:32774/test'
  }
};
