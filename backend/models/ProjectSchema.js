const Sequelize = require('sequelize');

module.exports = (sequelize) => {

  return sequelize.define('project', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    stock_price: {
      type: Sequelize.DOUBLE
    },
    suggested_price: {
      type: Sequelize.DOUBLE
    },
    user_id: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

};
