const artisanService = require('../services/artisanService');

exports.getAllArtisans = async (req, res) => {
    try {
        const artisans = await artisanService.getAllArtisans();
        res.json(artisans);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.getArtisanById = async (req, res) => {
    try {
        const artisan = await artisanService.getArtisanById(req.params.id);
        if (!artisan)
            return res.status(404).json({ message: "Artisan introuvable" });
        res.json(artisan);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.createArtisan = async (req, res) => {
    try {
        const artisan = await artisanService.createArtisan(req.body);
        res.status(201).json(artisan);
    } catch (error) {
        res.status(400).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.updateArtisan = async (req, res) => {
    try {
        const artisan = await artisanService.patchArtisan(req.params.id, req.body);
        if (!artisan)
            return res.status(404).json({ message: "Artisan introuvable" });
        res.json(artisan);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.patchArtisan = async (req, res) => {
    try {
        const artisan = await artisanService.patchArtisan(req.params.id, req.body);
        if (!artisan)
            return res.status(404).json({ message: "Artisan introuvable" });
        res.json(artisan);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.deleteArtisan = async (req, res) => {
    console.log("ID reçu :", req.params.id);
    try {
        const artisan = await artisanService.deleteArtisan(req.params.id);
        if (!artisan)
            return res.status(404).json({ message: "Artisan introuvable" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};