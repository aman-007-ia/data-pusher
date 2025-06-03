const { Destination, Account } = require('../models');

// Create destination for an account
exports.createDestination = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { url, method, headers } = req.body;

    const account = await Account.findByPk(accountId);
    if (!account) return res.status(404).json({ error: 'Account not found' });

    const destination = await Destination.create({
      url,
      method: method.toUpperCase(),
      headers,
      AccountId: accountId
    });

    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all destinations for an account
exports.getDestinationsByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const destinations = await Destination.findAll({ where: { AccountId: accountId } });
    res.json(destinations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get single destination
exports.getDestinationById = async (req, res) => {
  try {
    const dest = await Destination.findByPk(req.params.id);
    if (!dest) return res.status(404).json({ error: 'Destination not found' });
    res.json(dest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update destination
exports.updateDestination = async (req, res) => {
  try {
    const dest = await Destination.findByPk(req.params.id);
    if (!dest) return res.status(404).json({ error: 'Destination not found' });

    const { url, method, headers } = req.body;
    await dest.update({ url, method: method?.toUpperCase(), headers });

    res.json(dest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete destination
exports.deleteDestination = async (req, res) => {
  try {
    const dest = await Destination.findByPk(req.params.id);
    if (!dest) return res.status(404).json({ error: 'Destination not found' });

    await dest.destroy();
    res.json({ message: 'Destination deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
