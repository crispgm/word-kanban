'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tokens = sequelize.define('Tokens', {
    userId: DataTypes.STRING,
    token: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tokens;
};