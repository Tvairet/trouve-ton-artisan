const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  specialityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  grade: {
    type: DataTypes.DECIMAL(2, 1),
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
  top: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  tableName: 'artisans',
  timestamps: true,
});

module.exports = Artisan;