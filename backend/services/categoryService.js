const { Category } = require("../models/indexModels");

// Récuperer toutes les catehories
exports.getAllCategories = async () => {
    return await Category.findAll();
};

// Récuperer une catégorie par ID
exports.getCategoryById = async (id) => {
    return Category.findByPk(id);
};

// Créer une categorie
exports.createCategory = async (data) => {
    return await Category.create(data);
};

// Mettre a jour une catégorie
exports.updateCategory = async (id, data) => {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update(data);
};

// Modifier partiellement
exports.patchCategory = async (id, data) => {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update(data);
};

// Supprimer une catégorie
exports.deleteCategory = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) return false;
    await category.destroy();
    return true;
};