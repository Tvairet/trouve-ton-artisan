const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Consultation publique des catégories
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Les routes POST, PUT, PATCH et DELETE sont désactivées.
// Elles nécessiteront une authentification
// et une autorisation administrateur.

module.exports = router;
