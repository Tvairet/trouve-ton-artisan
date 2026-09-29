const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Speciality = sequelize.define('Speciality', {
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
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'specialities',
});

module.exports = Speciality;