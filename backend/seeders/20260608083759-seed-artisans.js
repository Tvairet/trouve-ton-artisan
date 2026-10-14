'use strict';

// Données des 17 artisans, conformes à database/seed.sql.
const defaultAbout =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.';

const artisans = [
  {
    name: 'Boucherie Dumont',
    speciality: 'Boucher',
    city: 'Lyon',
    grade: 4.7,
    email: 'dumont-boucherie@gmail.com',
    website: null,
  },
  {
    name: 'Au pain chaud',
    speciality: 'Boulanger',
    city: 'Montélimar',
    grade: 4.8,
    email: 'aupainchaud@hotmail.com',
    website: null,
  },
  {
    name: 'Chocolaterie Labbé',
    speciality: 'Chocolatier',
    city: 'Lyon',
    grade: 4.9,
    email: 'chocolaterie-labbe@gmail.com',
    website: 'https://chocolaterie-labbe.fr',
  },
  {
    name: 'Traiteur Truchon',
    speciality: 'Traiteur',
    city: 'Lyon',
    grade: 4.1,
    email: 'contact@truchon-traiteur.fr',
    website: 'https://truchon-traiteur.fr',
  },
  {
    name: 'Orville Salmons',
    speciality: 'Chauffagiste',
    city: 'Evian',
    grade: 5,
    email: 'o-salmons@live.com',
    website: null,
  },
  {
    name: 'Mont Blanc Electricité',
    speciality: 'Electricien',
    city: 'Chamonix',
    grade: 4.5,
    email: 'contact@mont-blanc-electricite.com',
    website: 'https://mont-blanc-electricite.com',
  },
  {
    name: 'Boutit & fils',
    speciality: 'Menuisier',
    city: 'Bourg-en-bresse',
    grade: 4.7,
    email: 'boutot-menuiserie@gmail.com',
    website: 'https://boutot-menuiserie.com',
  },
  {
    name: 'Vallis Bellemare',
    speciality: 'Plombier',
    city: 'Vienne',
    grade: 4,
    email: 'v.bellemare@gmail.com',
    website: 'https://plomberie-bellemare.com',
  },
  {
    name: 'Claude Quinn',
    speciality: 'Bijoutier',
    city: 'Aix les bains',
    grade: 4.2,
    email: 'claud.quinn@gmail.com',
    website: null,
  },
  {
    name: 'Ernest Carignan',
    speciality: 'Ferronier',
    city: 'Le Puy en Velay',
    grade: 5,
    email: 'e-carignan@hotmail.com',
    website: null,
  },
  {
    name: 'Amitee Lécuyer',
    speciality: 'Couturier',
    city: 'Annecy',
    grade: 4.5,
    email: 'e-amitee@hotmail.com',
    website: 'https://lecuyer-couture.com',
  },
  {
    name: 'Royden Charbonneau',
    speciality: 'Coiffeur',
    city: 'Saint-Priest',
    grade: 3.8,
    email: 'r.charbonneau@hotmail.fr',
    website: null,
  },
  {
    name: 'Leala Dennis',
    speciality: 'Coiffeur',
    city: 'Chambéry',
    grade: 4.1,
    email: 'l.dennos@hotmail.fr',
    website: 'https://coiffure-leala-chambery.fr',
  },
  {
    name: "C'est sup'hair",
    speciality: 'Coiffeur',
    city: 'Romans sur Isère',
    grade: 4.1,
    email: 'sup-hair@gmail.com',
    website: 'https://sup-hair.fr',
  },
  {
    name: 'Le monde des fleurs',
    speciality: 'Fleuriste',
    city: 'Annonay',
    grade: 4.6,
    email: 'contact@le-monde-des-fleurs-annonay.fr',
    website: 'https://le-monde-des-fleurs-annonay.fr',
  },
  {
    name: 'Valérie Laderoute',
    speciality: 'Toiletteur',
    city: 'Valence',
    grade: 4.5,
    email: 'v-laderoute@gmail.com',
    website: null,
  },
  {
    name: 'CM Graphisme',
    speciality: 'Webdesigner',
    city: 'Valence',
    grade: 4.4,
    email: 'contact@cm-graphisme.com',
    website: 'https://cm-graphisme.com',
  },
];

module.exports = {
  // Insérer les 17 artisans dans la base de données.
  async up(queryInterface, Sequelize) {
    // Récupérer les spécialités et leurs identifiants.
    const specialities = await queryInterface.sequelize.query(
      'SELECT id, name FROM specialities',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Associer chaque nom de spécialité à son ID.
    const specialityIds = new Map(
      specialities.map(({ id, name }) => [name, id])
    );

    const now = new Date();

    // Préparer les données des artisans.
    const data = artisans.map(({ speciality, ...artisan }) => {
      const specialityId = specialityIds.get(speciality);

      if (specialityId === undefined) {
        throw new Error(`Spécialité introuvable : ${speciality}`);
      }

      return {
        ...artisan,
        specialityId,
        about: defaultAbout,
        top: false,
        createdAt: now,
        updatedAt: now,
      };
    });

    // Insérer les artisans dans la table.
    await queryInterface.bulkInsert('artisans', data);
  },

  // Annuler l'insertion de ces artisans.
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('artisans', {
      email: {
        [Sequelize.Op.in]: artisans.map(({ email }) => email),
      },
    });
  },
};
