-- =====================================================================
-- Trouve ton artisan - Script d'alimentation de la base de données
-- À exécuter APRÈS schema.sql, sur les tables vides.
-- Les identifiants de catégorie et de spécialité sont retrouvés par leur
-- nom, ce qui évite de dépendre de l'ordre des insertions.
-- Données fournies par le client (export de la base réelle).
-- =====================================================================

SET NAMES utf8mb4;

-- ---------------------------------------------------------------------
-- Catégories
-- ---------------------------------------------------------------------
INSERT INTO categories (name) VALUES
  ('Alimentation'),
  ('Batiment'),
  ('Fabrication'),
  ('Services');

-- ---------------------------------------------------------------------
-- Spécialités, rattachées à leur catégorie
-- ---------------------------------------------------------------------
INSERT INTO specialities (name, categoryId) VALUES
  ('Boucher',       (SELECT id FROM categories WHERE name = 'Alimentation')),
  ('Boulanger',     (SELECT id FROM categories WHERE name = 'Alimentation')),
  ('Chocolatier',   (SELECT id FROM categories WHERE name = 'Alimentation')),
  ('Traiteur',      (SELECT id FROM categories WHERE name = 'Alimentation')),
  ('Chauffagiste',  (SELECT id FROM categories WHERE name = 'Batiment')),
  ('Electricien',   (SELECT id FROM categories WHERE name = 'Batiment')),
  ('Menuisier',     (SELECT id FROM categories WHERE name = 'Batiment')),
  ('Plombier',      (SELECT id FROM categories WHERE name = 'Batiment')),
  ('Bijoutier',     (SELECT id FROM categories WHERE name = 'Fabrication')),
  ('Couturier',     (SELECT id FROM categories WHERE name = 'Fabrication')),
  ('Ferronier',     (SELECT id FROM categories WHERE name = 'Fabrication')),
  ('Coiffeur',      (SELECT id FROM categories WHERE name = 'Services')),
  ('Fleuriste',     (SELECT id FROM categories WHERE name = 'Services')),
  ('Toiletteur',    (SELECT id FROM categories WHERE name = 'Services')),
  ('Webdesigner',   (SELECT id FROM categories WHERE name = 'Services'));

-- ---------------------------------------------------------------------
-- Artisans (données réelles fournies par le client)
-- ---------------------------------------------------------------------
INSERT INTO artisans (name, specialityId, city, grade, about, email, website, top) VALUES
  ('Boucherie Dumont',        (SELECT id FROM specialities WHERE name = 'Boucher'),      'Lyon',             4.7, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'dumont-boucherie@gmail.com',              NULL,                                    FALSE),
  ('Au pain chaud',           (SELECT id FROM specialities WHERE name = 'Boulanger'),    'Montélimar',       4.8, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'aupainchaud@hotmail.com',                 NULL,                                    FALSE),
  ('Chocolaterie Labbé',      (SELECT id FROM specialities WHERE name = 'Chocolatier'),  'Lyon',             4.9, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'chocolaterie-labbe@gmail.com',            'https://chocolaterie-labbe.fr',         FALSE),
  ('Traiteur Truchon',        (SELECT id FROM specialities WHERE name = 'Traiteur'),     'Lyon',             4.1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'contact@truchon-traiteur.fr',             'https://truchon-traiteur.fr',           FALSE),
  ('Orville Salmons',         (SELECT id FROM specialities WHERE name = 'Chauffagiste'), 'Evian',            5.0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'o-salmons@live.com',                      NULL,                                    FALSE),
  ('Mont Blanc Electricité',  (SELECT id FROM specialities WHERE name = 'Electricien'),  'Chamonix',         4.5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'contact@mont-blanc-electricite.com',      'https://mont-blanc-electricite.com',    FALSE),
  ('Boutit & fils',           (SELECT id FROM specialities WHERE name = 'Menuisier'),    'Bourg-en-bresse',  4.7, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'boutot-menuiserie@gmail.com',             'https://boutot-menuiserie.com',         FALSE),
  ('Vallis Bellemare',        (SELECT id FROM specialities WHERE name = 'Plombier'),     'Vienne',           4.0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'v.bellemare@gmail.com',                   'https://plomberie-bellemare.com',       FALSE),
  ('Claude Quinn',            (SELECT id FROM specialities WHERE name = 'Bijoutier'),    'Aix les bains',    4.2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'claud.quinn@gmail.com',                   NULL,                                    FALSE),
  ('Ernest Carignan',         (SELECT id FROM specialities WHERE name = 'Ferronier'),    'Le Puy en Velay',  5.0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'e-carignan@hotmail.com',                  NULL,                                    FALSE),
  ('Amitee Lécuyer',          (SELECT id FROM specialities WHERE name = 'Couturier'),    'Annecy',           4.5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'e-amitee@hotmail.com',                    'https://lecuyer-couture.com',           FALSE),
  ('Royden Charbonneau',      (SELECT id FROM specialities WHERE name = 'Coiffeur'),     'Saint-Priest',     3.8, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'r.charbonneau@hotmail.fr',                NULL,                                    FALSE),
  ('Leala Dennis',            (SELECT id FROM specialities WHERE name = 'Coiffeur'),     'Chambéry',         4.1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'l.dennos@hotmail.fr',                     'https://coiffure-leala-chambery.fr',    FALSE),
  ('C''est sup''hair',        (SELECT id FROM specialities WHERE name = 'Coiffeur'),     'Romans sur Isère', 4.1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'sup-hair@gmail.com',                      'https://sup-hair.fr',                   FALSE),
  ('Le monde des fleurs',     (SELECT id FROM specialities WHERE name = 'Fleuriste'),    'Annonay',          4.6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'contact@le-monde-des-fleurs-annonay.fr',  'https://le-monde-des-fleurs-annonay.fr', FALSE),
  ('Valérie Laderoute',       (SELECT id FROM specialities WHERE name = 'Toiletteur'),   'Valence',          4.5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'v-laderoute@gmail.com',                   NULL,                                    FALSE),
  ('CM Graphisme',            (SELECT id FROM specialities WHERE name = 'Webdesigner'),  'Valence',          4.4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'contact@cm-graphisme.com',                'https://cm-graphisme.com',              FALSE);