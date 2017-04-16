const ProjectCtrl = require('../../controllers').ProjectCtrl;

module.exports = (req, res) => {

  ProjectCtrl.get()
    .then(data => {
      res.send(data);
    })

};
