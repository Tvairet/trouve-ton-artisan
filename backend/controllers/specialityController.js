const specialityService = require('../services/specialityService');

exports.getAllSpecialities = async (req, res) => {
    try {
        const specialities = await specialityService.getAllSpecialities();
        return res.json(specialities);
    } catch (error) {
        console.error('Erreur chargement spécialités :', error);
        return res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};

exports.getSpecialityById = async (req, res) => {
    try {
        const speciality = await specialityService.getSpecialityById(req.params.id);

        if (!speciality) {
            return res.status(404).json({
                message: 'Spécialité introuvable'
            });
        }
        return res.json(speciality);
    } catch (error) {
        console.error('Erreur chargement spécialité :', error);
        return res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};

exports.createSpeciality = async (req, res) => {
    try {
        const speciality = await specialityService.createSpeciality(req.body);

        return res.status(201).json(speciality);
    } catch (error) {
        console.error('Erreur création spécialité :', error);

        const invalidData = [
            'SequelizeValidationError',
            'SequelizeUniqueConstraintError',
            'SequelizeForeignKeyConstraintError'
        ].includes(error.name);

        return res.status(invalidData ? 400 : 500).json({
            message: invalidData ? 'Données invalides' : 'Erreur serveur'
        });
    }
};

exports.updateSpeciality = async (req, res) => {
    try {
        const speciality = await specialityService.updateSpeciality(
            req.params.id,
            req.body
        );

        if (!speciality) {
            return res.status(404).json({
                message: 'Spécialité introuvable'
            });
        }

        return res.json(speciality);
    } catch (error) {
        console.error('Erreur modification spécialité :', error);

        return res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};

exports.patchSpeciality = async (req, res) => {
    try {
        const speciality = await specialityService.patchSpeciality(
            req.params.id,
            req.body
        );

        if (!speciality) {
            return res.status(404).json({
                message: 'Spécialité introuvable'
            });
        }

        return res.json(speciality);
    } catch (error) {
        console.error('Erreur modification partielle spécialité :', error);

        return res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};

exports.deleteSpeciality = async (req, res) => {
    try {
        const deleted = await specialityService.deleteSpeciality(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                message: 'Spécialité introuvable'
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Erreur suppression spécialité :', error);

        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(409).json({
                message: 'Cette spécialité est utilisée par des artisans.'
            });
        }

        return res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};