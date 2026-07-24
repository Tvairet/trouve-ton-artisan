const express = require('express');
const router = express.Router();
const artisanRoutes = require('./artisanRoutes');
const categoryRoutes = require('./categoryRoutes');
const specialityRoutes = require('./specialityRoutes');
const artisanService = require('../services/artisanService');

router.get('/', async (req, res) => {
    try {
        res.render('index');
   // res.send("test");
    } catch (err) {
        res.status(500).send('Erreur serveur test');
    }
});
router.get('/artisans', async (req, res) => {
    try {
        const artisans = await artisanService.getAllArtisans();
        res.render('artisan', { artisans });
    } catch (err) {
        res.status(500).send('Erreur serveur test');
    }
});

router.use('/category', categoryRoutes);
router.use('/speciality', specialityRoutes);
router.use('/artisans', artisanRoutes);

module.exports = router;