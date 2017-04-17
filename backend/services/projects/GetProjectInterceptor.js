/**
 * @type {service}
 * @description return array of projects
 */


const ProjectCtrl = require('../../controllers').ProjectCtrl;

module.exports = (req, res) => {

  ProjectCtrl.get({user_id: req.user.id})
    .then(data => {
      res.send(data);
    })

};
