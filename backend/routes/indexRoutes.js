const express = require('express');
const router = express.Router();
const artisanRoutes = require('./artisanRoutes');
const categoryRoutes = require('./categoryRoutes');
const specialityRoutes = require('./specialityRoutes');


router.use('/artisans', artisanRoutes);
router.use('/category', categoryRoutes);
router.use('/speciality', specialityRoutes);

module.exports = router;