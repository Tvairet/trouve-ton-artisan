const { Speciality } = require('../models/indexModels');

// Récupérer toutes les spécialités
exports.getAllSpecialities = async () => {
    return Speciality.findAll();
};

// Récupérer une spécialité par identifiant
exports.getSpecialityById = async (id) => {
    return Speciality.findByPk(id);
};

// Opérations réservées à une future gestion administrateur
exports.createSpeciality = async (data) => {
    return Speciality.create(data);
};

exports.updateSpeciality = async (id, data) => {
    const speciality = await Speciality.findByPk(id);

    if (!speciality) return null;

    return speciality.update(data);
};

exports.patchSpeciality = async (id, data) => {
    return exports.updateSpeciality(id, data);
};

exports.deleteSpeciality = async (id) => {
    const speciality = await Speciality.findByPk(id);

    if (!speciality) return false;

    await speciality.destroy();
    return true;
};
