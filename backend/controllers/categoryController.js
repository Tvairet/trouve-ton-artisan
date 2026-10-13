const categoryService = require('../services/categoryService');

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();

        return res.json(categories);
    } catch (error) {
        console.error('Erreur chargement catégories :', error);

        return res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};

// Récupérer une catégorie par identifiant
exports.getCategoryById = async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            message: 'Identifiant de catégorie invalide'
        });
    }

    try {
        const category = await categoryService.getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                message: 'Catégorie introuvable'
            });
        }

        return res.json(category);
    } catch (error) {
        console.error('Erreur chargement catégorie :', error);

        return res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};
