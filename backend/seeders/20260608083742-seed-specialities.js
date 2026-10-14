'use strict';

// Chaque spécialité est associée à sa catégorie.
const specialities = [
  ['Boucher', 'Alimentation'],
  ['Boulanger', 'Alimentation'],
  ['Chocolatier', 'Alimentation'],
  ['Traiteur', 'Alimentation'],

  ['Chauffagiste', 'Batiment'],
  ['Electricien', 'Batiment'],
  ['Menuisier', 'Batiment'],
  ['Plombier', 'Batiment'],

  ['Bijoutier', 'Fabrication'],
  ['Couturier', 'Fabrication'],
  ['Ferronier', 'Fabrication'],

  ['Coiffeur', 'Services'],
  ['Fleuriste', 'Services'],
  ['Toiletteur', 'Services'],
  ['Webdesigner', 'Services'],
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM categories',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const categoryIds = new Map(
      categories.map(category => [category.name, category.id])
    );

    const now = new Date();

    const data = specialities.map(([name, categoryName]) => {
      const categoryId = categoryIds.get(categoryName);

      if (categoryId === undefined) {
        throw new Error(`Catégorie introuvable : ${categoryName}`);
      }

      return {
        name,
        categoryId,
        createdAt: now,
        updatedAt: now,
      };
    });

    await queryInterface.bulkInsert('specialities', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('specialities', {
      name: specialities.map(([name]) => name),
    });
  },
};
