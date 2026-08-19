Trouve ton artisan !
Projet front + API pour répertoire d'artisans avec fiches détaillées.

🧩 Aperçu
Front : React + Vite + Bootstrap (pages : Accueil, Liste des artisans, Fiche artisan, Mentions légales, etc.).
Back : Express + Sequelize.
Base de données : MySQL/MariaDB (vue v_artisans_cards).

✅ Prérequis
Node.js 
npm 
MySQL/MariaDB 
Git

🗄️ Base de données

Générer les migrations pour créer les tables
npx sequelize-cli migration:generate --name create-artisans
npx sequelize-cli migration:generate --name create-categories
npx sequelize-cli migration:generate --name create-specialities

Appliquer les migrations
npx sequelize-cli db:migrate

Générer un composant de seed
npx sequelize-cli seed:generate --name seed-artisans
npx sequelize-cli seed:generate --name seed-specialities
npx sequelize-cli seed:generate --name seed-categories

Exécuter le seed
npx sequelize-cli db:seed:all

API

Déployer sur un hébergeur (Alwaysdata). Remplir variables d’env côté hébergeur.

adresse du site

https://trouve-ton-artisan.alwaysdata.net/