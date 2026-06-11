const { Speciality } = require('../models/indexModels');

// récuperer toutes les spécialités
exports.getAllSpecialiies = async () => {
    return await Speciality.findAll();
};

// Récuperer une spécialité par id
exports.getSpecialityById = async (id) => {
    return await Speciality.findById(id);
};

// Créer une spécialite
exports.createSpeciality = async (data) => {
    return await Speciality.create(data);
};

// Mettre a jour une spécialite
exports.updateSpeciality = async (id, data) => {
    const speciality = await Speciality.findById(id);
    if (!speciality) return null;
    return await speciality.update(data);
};

// Modifier partiellement par id
exports.patchSpeciality = async (id, data) => {
    const speciality = await Speciality.findById(id);
    if (!speciality) return null;
    return await speciality.update(data);
};

// Supprimer une spécialite
exports.deleteSpeciality = async (id) => {
    const speciality = await Speciality.findById(id);
    if (!speciality) return false;
    await speciality.destroy();
    return true;
};