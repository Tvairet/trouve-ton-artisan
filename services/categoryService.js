const { Category } = require("../models/categoryModels");

// Récuperer toutes les catehories
exports.getAllCategories = async () => {
    return await Category.findAll();
};

// Récuperer une catégorie par ID
exports.getCategoryById = async (id) => {
    return await Category.findByPK(id);
};

// Créer une categorie
exports.createCategory = async (data) => {
    return await Category.create(data);
};

// Mettre a jour une catégorie
exports.updateCategory = async ( data) => {
    const category = await Category.findByPK(id);
    if (!category) return null;
    return await category.update(data);
};

// Modifier partiellement
exports.patchCategory = async (data) => {
    const category = await Category.findByPK(id);
    if (!category) return null;
    return await category.update(data);
};

// Supprimer une catégorie
exports.deleteCategory = async (id) => {
    const category = await Category.fundByPK(id);
    if (!category) return false;
    await category.destroy();
    return true;
};