const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

// Create destination for an account
router.post('/:accountId', destinationController.createDestination);

// Get all destinations for an account
router.get('/:accountId', destinationController.getDestinationsByAccount);

// Get single destination by id
router.get('/single/:id', destinationController.getDestinationById);

// Update destination
router.put('/:id', destinationController.updateDestination);

// Delete destination
router.delete('/:id', destinationController.deleteDestination);

module.exports = router;
