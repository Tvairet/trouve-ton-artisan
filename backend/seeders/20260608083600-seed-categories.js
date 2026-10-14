'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('categories', [
      {
        name: 'Alimentation',
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'Batiment',
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'Fabrication',
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'Services',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', {
      name: [
        'Alimentation',
        'Batiment',
        'Fabrication',
        'Services',
      ],
    });
  },
};
