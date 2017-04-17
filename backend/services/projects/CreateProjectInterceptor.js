/**
 * @type {service}
 * @description creates new project
 */

const ProjectCtrl = require('../../controllers').ProjectCtrl,
  _ = require('lodash');

module.exports = (req, res) => {

  ProjectCtrl.create(_.set(req.body, 'user_id', req.user.id))
    .then(data => {
      res.send(data);
    })

};
