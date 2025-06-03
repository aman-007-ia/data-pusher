const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Create Account
router.post('/', accountController.createAccount);

// Get Account by ID
router.get('/:id', accountController.getAccount);

// Update Account
router.put('/:id', accountController.updateAccount);

// Delete Account
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
