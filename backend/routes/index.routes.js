const express = require('express');
const router = express.Router();
const artisanRoutes = require('./artisan.routes');
const categoryRoutes = require('./category.routes');
const specialityRoutes = require('./speciality.routes');

router.use('/category', categoryRoutes);
router.use('/speciality', specialityRoutes);
router.use('/artisans', artisanRoutes);

module.exports = router;