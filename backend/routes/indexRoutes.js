const express = require('express');
const router = express.Router();
const artisanRoutes = require('./artisanRoutes');
const categoryRoutes = require('./categoryRoutes');
const specialityRoutes = require('./specialityRoutes');
const artisanService = require('../services/artisanService');
const categoryService = require('../services/categoryService');

router.get('/', async (req, res) => {
    try {
        res.render('index');
    } catch (err) {
        res.status(500).send('Erreur serveur test');
    }
});
router.get('/artisans', async (req, res) => {
    try {
        const artisans = await artisanService.getAllArtisans();
        res.render('artisan', { artisans });
    } catch (err) {
        res.status(500).send('Erreur serveur artisan');
    }
});

router.get('/category', async (req, res) => {
    try {
        const categories = await categoryService.getAllCategory();
        res.render('category', {categories});
    }catch (err) {
        res.status(500).send('Erreur serveur cat');
    }
});

router.use('/category', categoryRoutes);
router.use('/speciality', specialityRoutes);
router.use('/artisans', artisanRoutes);

module.exports = router;