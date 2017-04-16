const ProjectCtrl = require('../../controllers').ProjectCtrl,
  messages = require('../../factories').messages;

module.exports = (req, res) => {

  console.log(req.body);

  ProjectCtrl.create(req.body)
    .then(data => {
      res.send(data);
    })

};
