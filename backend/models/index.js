/**
 * @type {factory}
 * @description rootpoint of model's module
 */

const ProjectSchema = require('./ProjectSchema'),
  UserSchema = require('./UserSchema'),
  Sequelize = require('sequelize'),
  config = require('../config'),
  _ = require('lodash'),
  sequelize = new Sequelize(config.database.uri);

let schemas = {
  ProjectSchema: ProjectSchema(sequelize),
  UserSchema: UserSchema(sequelize)
};

module.exports = {
  schemas: schemas,
  methods: {
    sync: () =>
      Promise.all([
        _.chain(schemas).values()
          .forEach(schema =>
            new Promise(res =>
              schema.sync()
            )
          )
          .value()
      ])
  }
};
