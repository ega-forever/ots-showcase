/**
 * @type {controller}
 * @description user's controllers - perform CRUD operations on data
 */


const UserModel = require('../models').schemas.UserSchema;

module.exports = {
  create: (model) =>
    UserModel.create(model),
  update: (model, criteria) =>
    UserModel.update(model, {where: criteria}),
  delete: (criteria) =>
    UserModel.destroy({where: criteria}),
  get: (criteria = {}) =>
    UserModel.findOne({where: criteria})
};