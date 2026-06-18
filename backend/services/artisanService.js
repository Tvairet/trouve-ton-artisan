const { Artisan } = require("../models/indexModels");

//Récuperer tous les artisans
exports.getAllArtisans = async () => {
    return await Artisan.findAll();
};

// Récuperer un artisan par ID
exports.getArtisanById = async (id) => {
    return Artisan.findById(id);
};

// Créer un artisan
exports.createArtisan = async (data) => {
    return await Artisan.create(data);
};

// Mettre à jour un artisan
exports.updateArtisan = async (id, data) => {
    const artisan = await Artisan.findById(id);
    if (!artisan) return null;
    return await artisan.update(data);
};

// Modifier partiellement 
exports.patchArtisan = async(id, data) => {
    const artisan = await Artisan.findById(id);
    if (!artisan) return null;
    return await artisan.update(data);
};

// Supprimer un artisan
exports.deleteArtisan = async (id) => {
    const artisan = await Artisan.findById(id);
    if (!artisan) return false;
    await artisan.destroy();
    return true;
};