'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { name: 'Alimentation' },
      { name: 'Batiment' },
      { name: 'Fabrication' },
      { name: 'Services' }
    ]);
  },

  async down (queryInterface, Sequelize) {
    
  }
};