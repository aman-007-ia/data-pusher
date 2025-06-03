const { Account, Destination } = require('../models');

// Create Account
exports.createAccount = async (req, res) => {
  try {
    const { email, account_name, website } = req.body;
    const account = await Account.create({ email, account_name, website });
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Account by ID
exports.getAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Account
exports.updateAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });

    const { email, account_name, website } = req.body;
    await account.update({ email, account_name, website });
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Account + its Destinations
exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });

    await account.destroy();
    res.json({ message: 'Account and its destinations deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
