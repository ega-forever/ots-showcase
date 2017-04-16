const Sequelize = require('sequelize');

module.exports = (sequelize) => {

  return sequelize.define('user', {
    googleId: {
      type: Sequelize.STRING
    },
    access_token: Sequelize.STRING
  }, {
    freezeTableName: true
  });

};
