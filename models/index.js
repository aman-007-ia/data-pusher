const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_NAME || 'data.sqlite',
});

const Account = require('./account')(sequelize);
const Destination = require('./destination')(sequelize);

// Associations
Account.hasMany(Destination, { onDelete: 'CASCADE' });
Destination.belongsTo(Account);

module.exports = {
  sequelize,
  Account,
  Destination
};
