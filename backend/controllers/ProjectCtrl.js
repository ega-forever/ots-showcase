const ProjectModel = require('../models').schemas.ProjectSchema;

module.exports = {
  create: (model) =>
    ProjectModel.create(model),
  update: (model, criteria) =>
    ProjectModel.update(model, {where: criteria}),
  delete: (criteria) =>
    ProjectModel.destroy({where: criteria}),
  get: (criteria = {}) =>
    ProjectModel.findAll({where: criteria})
};