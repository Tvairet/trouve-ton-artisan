const express = require('express');
const router = express.Router();
const categoryController = require('../') // a completer 

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.patch('/:id', categoryController.patchCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;