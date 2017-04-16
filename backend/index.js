const express = require('express'),
  config = require('./config'),
  routes = require('./routes'),
  cluster = require('cluster'),
  numCPUs = require('os').cpus().length,
  passport = require('passport'),
  AuthCtrl = require('./controllers').AuthCtrl,
  models = require('./models');

if (cluster.isMaster) {

  models.methods.sync().then(()=>{
    console.log('synced');
  });

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {

  let app = express();
  let server = require('http').Server(app);

  AuthCtrl(passport);
  routes(app, passport);

  server.listen(config.expressPort);

}