const { Artisan, Speciality, Category } = require('../models/indexModels');

// Inclusion commune : la spécialité de l'artisan, et la catégorie de cette spécialité
const specialityInclude = {
  model: Speciality,
  as: 'speciality',
  attributes: ['id', 'name', 'categoryId'],
  include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }]
};

// Remet l'artisan sous la forme "plate" attendue par le frontend
// (speciality en texte, categoryId en nombre), même si en base l'information
// est maintenant normalisée dans deux tables séparées reliées par jointure.
const toFlatArtisan = (artisan) => {
  const plain = artisan.toJSON();
  const speciality = plain.speciality;
  return {
    id: plain.id,
    name: plain.name,
    city: plain.city,
    grade: plain.grade,
    about: plain.about,
    email: plain.email,
    website: plain.website,
    top: plain.top,
    createdAt: plain.createdAt,
    updatedAt: plain.updatedAt,
    specialityId: plain.specialityId,
    speciality: speciality ? speciality.name : null,
    categoryId: speciality ? speciality.categoryId : null,
    category: speciality && speciality.category ? speciality.category.name : null,
  };
};

// Récupérer tous les artisans, avec filtrage optionnel par catégorie
// (la restriction se fait ici, côté API, via une jointure + WHERE)
exports.getAllArtisans = async (categoryId) => {
  const include = { ...specialityInclude };
  if (categoryId) {
    include.where = { categoryId };
  }
  const artisans = await Artisan.findAll({ include: [include] });
  return artisans.map(toFlatArtisan);
};

// Récuperer un artisan par ID
exports.getArtisanById = async (id) => {
  const artisan = await Artisan.findByPk(id, { include: [specialityInclude] });
  return artisan ? toFlatArtisan(artisan) : null;
};

// Créer un artisan (attend specialityId, pas categoryId ni speciality en texte)
exports.createArtisan = async (data) => {
  const artisan = await Artisan.create(data);
  return exports.getArtisanById(artisan.id);
};

// Mettre à jour un artisan
exports.updateArtisan = async (id, data) => {
  const artisan = await Artisan.findByPk(id);
  if (!artisan) return null;
  await artisan.update(data);
  return exports.getArtisanById(id);
};

// Modifier partiellement
exports.patchArtisan = async (id, data) => {
  const artisan = await Artisan.findByPk(id);
  if (!artisan) return null;
  await artisan.update(data);
  return exports.getArtisanById(id);
};

// Supprimer un artisan
exports.deleteArtisan = async (id) => {
  const artisan = await Artisan.findByPk(id);
  if (!artisan) return false;
  await artisan.destroy();
  return true;
};