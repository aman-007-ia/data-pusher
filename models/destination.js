const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Destination', {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false
    },
    headers: {
      type: DataTypes.JSON,
      allowNull: false
    }
  });
};
