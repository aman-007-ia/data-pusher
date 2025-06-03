const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data.sqlite'
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
