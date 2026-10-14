const artisanService = require('../services/artisanService');


exports.getAllArtisans = async (req, res) => {
    try {
        const rawCategoryId = req.query.categoryId;
        let categoryId;

        if (rawCategoryId !== undefined) {
            categoryId = Number(rawCategoryId);

            if (
                typeof rawCategoryId !== 'string' ||
                !/^[1-9]\d*$/.test(rawCategoryId) ||
                !Number.isSafeInteger(categoryId)
            ) {
                return res.status(400).json({
                    message: "categoryId doit être un entier positif."
                });
            }
        }

        const artisans = await artisanService.getAllArtisans(categoryId);

        res.json(artisans);
    } catch (error) {
        console.error('Erreur API artisans :', error);
        res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};


exports.getArtisanById = async (req, res) => {
    try {
        const artisan = await artisanService.getArtisanById(req.params.id);
        if (!artisan)
            return res.status(404).json({ message: "Artisan introuvable" });
        res.json(artisan);
    } catch (error) {
        console.error('Erreur API artisans :', error);
        res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};

exports.createArtisan = async (req, res) => {
    try {
        const artisan = await artisanService.createArtisan(req.body);
        res.status(201).json(artisan);
    } catch (error) {
        console.error('Erreur API artisans :', error);
        res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};

exports.updateArtisan = async (req, res) => {
    try {
        const artisan = await artisanService.patchArtisan(req.params.id, req.body);
        if (!artisan)
            return res.status(404).json({ message: "Artisan introuvable" });
        res.json(artisan);
    } catch (error) {
        console.error('Erreur API artisans :', error);
        res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};

exports.patchArtisan = async (req, res) => {
    try {
        const artisan = await artisanService.patchArtisan(req.params.id, req.body);
        if (!artisan)
            return res.status(404).json({ message: "Artisan introuvable" });
        res.json(artisan);
    } catch (error) {
        console.error('Erreur API artisans :', error);
        res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};

exports.deleteArtisan = async (req, res) => {
    try {
        const artisan = await artisanService.deleteArtisan(req.params.id);
        if (!artisan)
            return res.status(404).json({ message: "Artisan introuvable" });
        res.status(204).send();
    } catch (error) {
        console.error('Erreur API artisans :', error);
        res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};