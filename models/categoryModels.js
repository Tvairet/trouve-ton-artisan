const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Categories', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'categories', // Facultatif si nom différent du modèle
});

module.exports = Category;