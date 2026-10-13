const express = require('express');
const router = express.Router();
const specialityController = require('../controllers/specialityController');

// Consultation publique des spécialités
router.get('/', specialityController.getAllSpecialities);
router.get('/:id', specialityController.getSpecialityById);

// Routes POST, PUT, PATCH et DELETE désactivées.
// Elles seront réactivées avec une authentification
// et une autorisation administrateur côté API.

module.exports = router;
