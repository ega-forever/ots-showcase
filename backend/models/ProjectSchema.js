/**
 * @type {model}
 * @description project's model
 */

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

  return sequelize.define('project', {
    title: {
      type: Sequelize.STRING,
      notNull: true
    },
    description: {
      type: Sequelize.STRING,
      notNull: true
    },
    stock_price: {
      type: Sequelize.DOUBLE,
      validate: {
        min: 0
      }
    },
    suggested_price: {
      type: Sequelize.DOUBLE,
      validate: {
        min: 0
      }
    },
    user_id: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

};
