const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Artisan = sequelize.define('Artisans', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  speciality: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  grade: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  about: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'L’URL du site web doit être valide (ex : https://monsite.com)',
      },
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  top: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  tableName: 'artisans', // Facultatif si nom différent du modèle
  timestamps: true,   // Crée createdAt et updatedAt automatiquement
});

module.exports = Artisan;