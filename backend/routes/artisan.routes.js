const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');

// Consultation publique des artisans
router.get('/', artisanController.getAllArtisans);
router.get('/:id', artisanController.getArtisanById);

// Les routes POST, PUT, PATCH et DELETE sont désactivées.
// Elles seront réactivées après la mise en place
// d'une authentification administrateur côté API.

module.exports = router;