'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('artisans', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      specialityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'specialities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      city: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      grade: {
        type: Sequelize.DECIMAL(2, 1),
        allowNull: true,
      },

      about: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: 'uq_artisans_email',
      },

      website: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      top: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, {
      engine: 'InnoDB',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    });

    // Mise à jour automatique de updatedAt, comme dans schema.sql.
    await queryInterface.sequelize.query(`
      ALTER TABLE artisans
      MODIFY COLUMN updatedAt DATETIME NOT NULL
      DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP
    `);

    // La note doit être comprise entre 0 et 5.
    await queryInterface.sequelize.query(`
      ALTER TABLE artisans
      ADD CONSTRAINT ck_artisans_grade
      CHECK (grade IS NULL OR (grade >= 0 AND grade <= 5))
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('artisans');
  },
};
