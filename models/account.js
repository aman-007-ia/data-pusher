const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const generateToken = require('../utils/generateToken');

module.exports = (sequelize) => {
  return sequelize.define('Account', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    app_secret_token: {
      type: DataTypes.STRING,
      defaultValue: generateToken
    }
  });
};
