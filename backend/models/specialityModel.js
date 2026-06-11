const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Speciality = sequelize.define('Specialities', {
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
  tableName: 'specialities',
});

module.exports = Speciality;