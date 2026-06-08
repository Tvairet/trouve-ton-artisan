const sequelize = require('../config/db');
const Artisan = require('./artisanModel');
const Category = require('./categoryModel');
const Speciality = require('./specialityModel');

// --- Définition des relations ---
Category.hasOne(Artisan, {
  foreignKey: 'categoryId',  // clé étrangère dans Category
  as: 'artisans'         // alias pour les jointures
});
Speciality.hasOne(Artisan, {
  foreignKey: 'specialityId',  // clé étrangère dans Speciality
  as: 'artisans'         // alias pour les jointures
});

Artisan.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'categories'
});
Artisan.belongsTo(Speciality, {
  foreignKey: 'specialityId',
  as: 'specialities'
});

// --- Synchronisation ---
const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion MySQL réussie');
    await sequelize.sync({ alter: true }); // crée ou met à jour les tables
    console.log('Tables synchronisées');
  } catch (err) {
    console.error('Erreur de synchronisation :', err);
  }
};

module.exports = { sequelize, Artisan, Category, Speciality, initDb };