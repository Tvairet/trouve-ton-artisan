const specialityService = require('../services/specialityService');

exports.getAllSpecialities = async (req, res) => {
    const specialities = await specialityService.getAllSpecialities();
    try {
        res.json(specialities);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.getspecialityById = async (res, res) => {
    const speciality = await specialityService.getspecialityById(req.params.id);
    try {
        if (!speciality)
            return res.status(404).json({ message: "Spécialité introuvable"});
        res.json(speciality);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message});
    }
};

exports.createSpeciality = async(req, res) => {
    try {
        const speciality = await specialityService.createSpeciality(req.body);
        res.status(201).json(speciality).send('Spécialité créée avec succès');
    } catch (err) {
        res.status(400).json({message: err.message });
    }
};

exports.updateSpeciality = async (req, res) => {
    const speciality = await specialityService.patchSpeciality(req.params.id, req.body);
    try {
        if (!speciality)
            return res.status(404).json({ message: "Spécialité introuvable" });
        res.json(speciality).send('Spécialité modifiée avec succès');
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message});
    }
};

exports.patchSpeciality = async (req, res) => {
    const speciality = await specialityService.patchSpeciality(req.params.id, req.body);
    try {
        if (!speciality)
            return res.status(404).json({ message: "Spécialité introuvable"});
        res.json(speciality).send('Spécialité modifiée avec succès');
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message});
    }
};

exports.deleteSpeciality = async (req, res) => {
    console.log("ID reçu :", req.params.id);
    const speciality = await specialityService.deleteSpeciality(req.params.id);
    try {
        if (!speciality)
            return res.status(404).json({ message: 'Spécialité introuvable'});
        res.status(204).send('Spécialité supprimée avec succès');
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};