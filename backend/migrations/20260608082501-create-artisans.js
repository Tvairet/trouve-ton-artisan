'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Artisans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      speciality: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      grade: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      website: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Artisans');
  }
};