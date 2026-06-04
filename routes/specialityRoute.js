const express = require('express');
const router = express.Router();
const specialityController = require('../') // a completer

router.get('/', specialityController.getAllSpecialities);
router.post('/', specialityController.createSpeciality);
router.get('/:id', specialityController.getSpecialityById);
router.put('/:id', specialityController.updateSpeciality);
router.patch('/:id', specialityController.patchSpeciality);
router.delete('/:id', specialityController.deleteSpeciality);

module.exports = router;
