'use strict';
module.exports = (sequelize, DataTypes) => {
  var Words = sequelize.define('Words', {
    text: DataTypes.STRING,
    listId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Words;
};