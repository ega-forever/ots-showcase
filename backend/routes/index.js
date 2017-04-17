/**
 * @type {service}
 * @description - registers all routes for express
 */

const services = require('../services'),
  express = require('express');

module.exports = (app, passport) => {

  app.all('*', (req, res, next) => {

    let responseSettings = {
      AccessControlAllowOrigin: req.headers.origin,
      AccessControlAllowHeaders: 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name',
      AccessControlAllowMethods: 'POST, GET, PUT, DELETE, OPTIONS',
      AccessControlAllowCredentials: true
    };

    res.header('Access-Control-Allow-Credentials', responseSettings.AccessControlAllowCredentials);
    res.header('Access-Control-Allow-Origin', responseSettings.AccessControlAllowOrigin);
    res.header('Access-Control-Allow-Headers', (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : 'x-requested-with');
    res.header('Access-Control-Allow-Methods', (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
  });

  app.use(express.static('../frontend/dist'));

  app.get('/auth/google', passport.authenticate('google', {session: false, scope: ['profile', 'email']}));

  app.get('/oauth', passport.authenticate('google', {session: false, failureRedirect: '/login'}),
    (req, res) => {
      res.redirect(`/#access_token=${req.user.access_token}`)
    });

  app.all('/api/*', passport.authenticate('bearer', { session: false }));

  app.post('/api/projects', services.Projects.create);

  app.get('/api/projects', services.Projects.get);

  app.put('/api/projects', services.Projects.update);

  app.delete('/api/projects', services.Projects.delete);

};