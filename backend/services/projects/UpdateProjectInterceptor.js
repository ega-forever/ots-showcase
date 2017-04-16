const ProjectCtrl = require('../../controllers').ProjectCtrl,
  messages = require('../../factories').messages;

module.exports = (req, res) => {

  console.log(req.body);

  ProjectCtrl.update(req.body, {id: 4})
    .then(data => {
      res.send(data);
    })

};
