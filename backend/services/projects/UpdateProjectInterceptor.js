/**
 * @type {service}
 * @description update exciting project
 */


const ProjectCtrl = require('../../controllers').ProjectCtrl,
  _ = require('lodash');

module.exports = (req, res) => {

  ProjectCtrl.update(
    _.omit(req.body, ['id', 'user_id']),
    {user_id: req.user.id, id: req.body.id}
    )
    .then(data => {
      res.send(data);
    })

};
