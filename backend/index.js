/**
 * @type {root point}
 * @description app initializes here
 */

const express = require('express'),
  config = require('./config'),
  routes = require('./routes'),
  cluster = require('cluster'),
  numCPUs = require('os').cpus().length,
  passport = require('passport'),
  AuthCtrl = require('./controllers').AuthCtrl,
  models = require('./models'),
  bodyParser = require('body-parser'),
  log4js = require('log4js').getLogger();


if (cluster.isMaster) {

  models.methods.sync().then(()=>{
    log4js.debug('synced');
  });

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {

  let app = express();
  let server = require('http').Server(app);

  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  AuthCtrl(passport);
  routes(app, passport);

  server.listen(config.expressPort);

}