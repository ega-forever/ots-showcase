const ProjectCtrl = require('../../controllers').ProjectCtrl,
  messages = require('../../factories').messages;

module.exports = (req, res) => {

  console.log(req.body);

  ProjectCtrl.delete(req.body)
    .then(status => {
      res.send(status === 1 ? messages.Generic.success : 'fail');
    })

};
