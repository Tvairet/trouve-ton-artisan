const sequelize = require('../config/db');
const Artisan = require('./artisanModel');
const Category = require('./categoryModel');
const Speciality = require('./specialityModel');

// --- Définition des relations ---
Category.hasMany(Speciality, {
  foreignKey: 'categoryId',
  as: 'specialities'
});
Speciality.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

Speciality.hasMany(Artisan, {
  foreignKey: 'specialityId',
  as: 'artisans'
});
Artisan.belongsTo(Speciality, {
  foreignKey: 'specialityId',
  as: 'speciality'
});

module.exports = { sequelize, Artisan, Category, Speciality };