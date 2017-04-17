/**
 * @type {service}
 * @description removes exciting project
 */


const ProjectCtrl = require('../../controllers').ProjectCtrl,
  messages = require('../../factories').messages;

module.exports = (req, res) => {

  ProjectCtrl.delete({id: req.query.id, user_id: req.user.id})
    .then(status => {
      res.send(status === 1 ? messages.Generic.success : 'fail');
    })

};
