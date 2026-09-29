-- =====================================================================
-- Trouve ton artisan - Script de création de la base de données
-- Compatible MySQL / MariaDB (InnoDB, utf8mb4)
--
-- Utilisation : sélectionner d'abord la base de données cible (par exemple
-- dans phpMyAdmin), puis exécuter ce script. Il peut être relancé autant
-- de fois que nécessaire : il supprime puis recrée les tables.
-- =====================================================================

SET NAMES utf8mb4;

-- Suppression dans l'ordre inverse des dépendances (clés étrangères)
DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS specialities;
DROP TABLE IF EXISTS categories;

-- ---------------------------------------------------------------------
-- Table categories : les grandes familles d'artisanat
-- ---------------------------------------------------------------------
CREATE TABLE categories (
  id         INT          NOT NULL AUTO_INCREMENT,
  name       VARCHAR(50)  NOT NULL,
  createdAt  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT uq_categories_name UNIQUE (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table specialities : chaque spécialité appartient à UNE catégorie
-- ---------------------------------------------------------------------
CREATE TABLE specialities (
  id         INT          NOT NULL AUTO_INCREMENT,
  name       VARCHAR(50)  NOT NULL,
  categoryId INT          NOT NULL,
  createdAt  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT uq_specialities_name UNIQUE (name),
  CONSTRAINT fk_specialities_category
    FOREIGN KEY (categoryId) REFERENCES categories (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table artisans : chaque artisan a UNE spécialité (sa catégorie s'en
-- déduit par jointure, elle n'est donc pas stockée ici : 3ème forme normale)
-- ---------------------------------------------------------------------
CREATE TABLE artisans (
  id           INT           NOT NULL AUTO_INCREMENT,
  name         VARCHAR(100)  NOT NULL,
  specialityId INT           NOT NULL,
  city         VARCHAR(50)   NOT NULL,
  grade        DECIMAL(2,1)  NULL,
  about        VARCHAR(255)  NULL,
  email        VARCHAR(150)  NOT NULL,
  website      VARCHAR(255)  NULL,
  top          BOOLEAN       NOT NULL DEFAULT FALSE,
  createdAt    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT uq_artisans_email UNIQUE (email),
  CONSTRAINT ck_artisans_grade CHECK (grade IS NULL OR (grade >= 0 AND grade <= 5)),
  CONSTRAINT fk_artisans_speciality
    FOREIGN KEY (specialityId) REFERENCES specialities (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;