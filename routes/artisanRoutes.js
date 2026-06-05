const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController') 

router.get('/', artisanController.getAllArtisans);
router.post('/', artisanController.createArtisan);
router.get('/:id', artisanController.getArtisansById);
router.put('/:id', artisanController.updateArtisan);
router.patch('/:id', artisanController.patchArtisan);
router.delete('/:id', artisanController.deleteArtisan);

module.exports = router;