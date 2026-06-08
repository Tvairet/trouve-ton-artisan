'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Specialities', [
      { name: 'Boucher' },
      { name: 'Boulanger' },
      { name: 'Chocolatier' },
      { name: 'Traiteur' },
      { name: 'Chauffagiste' },
      { name: 'Electricien' },
      { name: 'Menuisier' },
      { name: 'Plombier' },
      { name: 'Bijoutier' },
      { name: 'Couturier' },
      { name: 'Ferronier' },
      { name: 'Coiffeur' },
      { name: 'Fleuriste' },
      { name: 'Toiletteur' },
      { name: 'Webdesigner' },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};