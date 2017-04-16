const ProjectSchema = require('./ProjectSchema'),
  UserSchema = require('./UserSchema'),
  Sequelize = require('sequelize'),
  _ = require('lodash'),
  sequelize = new Sequelize('mysql://root:root@localhost:32774/test');

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
              schema.sync().success(res)
            )
          )
          .value()
      ])
  }
};
