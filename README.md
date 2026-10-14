# Trouve ton artisan !

**Devoir bilan 2 — Formation Développeur Web (2026)**  
Projet de mise en relation entre les habitants de la région Auvergne-Rhône-Alpes et les artisans locaux.

- **Site en ligne :** https://trouve-ton-artisan.alwaysdata.net/
- **Dépôt GitHub :** https://github.com/Tvairet/trouve-ton-artisan
- **Maquettes Figma :** https://www.figma.com/design/ImAkXmXVELioEmMo0NaDrR/Trouve-ton-artisan

## 1. Présentation

Le site permet de consulter des artisans, de les retrouver par catégorie ou par recherche et d'accéder à leur fiche détaillée. L'interface est adaptée aux écrans mobiles, tablettes et ordinateurs.

### Fonctionnalités disponibles

- Accueil avec les **trois artisans les mieux notés** (calculés à partir des notes renvoyées par l'API).
- Quatre catégories : **Alimentation, Bâtiment, Fabrication et Services**.
- Liste des artisans filtrée **côté API** selon la catégorie sélectionnée.
- Recherche par **nom, ville ou spécialité**.
- Fiches détaillées dans des fenêtres modales : spécialité, note, ville, description, lien de site web éventuel et photographie illustrative de la catégorie.
- Formulaire de contact ouvrant le logiciel de messagerie de l'utilisateur via `mailto:`.
- Page 404 personnalisée pour les routes inexistantes.

Les liens du pied de page (mentions légales, données personnelles, accessibilité, cookies) mènent actuellement à la page 404 : ces pages ne sont pas implémentées dans la version fournie.

## 2. Technologies

| Partie | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Bootstrap 5, CSS/SCSS |
| Backend | Node.js, Express, Sequelize, MySQL2 |
| Base de données | MySQL ou MariaDB |
| Déploiement utilisé | Alwaysdata (application Node.js et frontend compilé) |

Le backend suit une organisation en **routes, contrôleurs, services et modèles**. Le frontend réutilise notamment les composants `Header`, `Footer`, `ArtisanModal` et `ArtisanRating`.

## 3. Organisation du projet

```text
Trouve-ton-artisan/
├── backend/
│   ├── app.js                  # Point d'entrée du serveur Express
│   ├── config/                 # Connexion Sequelize à MySQL
│   ├── controllers/            # Gestion des requêtes HTTP
│   ├── services/               # Accès aux données et logique métier
│   ├── models/                 # Modèles Sequelize et associations
│   ├── routes/                 # Routes de l'API
│   ├── migrations/             # Création des tables avec Sequelize CLI
|   └── seeders/                # Alimentation des tables avec Sequelize CLI
├── database/
│   ├── schema.sql              # Création des tables
│   └── seed.sql                # Alimentation de la base
├── frontend/
│   ├── public/                 # Images publiques
│   ├── src/
│   │   ├── components/         # Composants React réutilisables
│   │   ├── pages/              # Accueil, catégories, page 404
│   │   ├── assets/             # Logo, icônes et polices
│   │   └── styles/             # Styles CSS et SCSS
│   └── package.json
└── README.md
```

## 4. Prérequis

- Node.js et npm, dans des versions compatibles avec **Vite 8**.
- MySQL ou MariaDB, par exemple via **XAMPP** en développement local.
- Un éditeur de code (par exemple VS Code).
- Git, pour cloner le dépôt (facultatif si le projet est déjà téléchargé).

## 5. Installer et lancer en local

### 5.1 Récupérer le projet

```bash
git clone https://github.com/Tvairet/trouve-ton-artisan.git
cd trouve-ton-artisan
```

Si le projet est déjà sur l'ordinateur, ouvrir directement son dossier racine dans le terminal.


### 5.2 Préparer la base de données

Le projet utilise MySQL/MariaDB avec Sequelize comme ORM.

Deux méthodes permettent d'initialiser une base de données.
Elles sont alternatives : ne pas les exécuter toutes les deux
sur une même base déjà remplie.

#### Méthode 1 — Scripts SQL

1. Démarrer MySQL avec XAMPP.
2. Ouvrir phpMyAdmin.
3. Créer une base de données vide, par exemple
   `trouve-ton-artisan`.
4. Importer `database/schema.sql`.
5. Importer `database/seed.sql`.

Attention : `schema.sql` utilise `DROP TABLE IF EXISTS`.
Il supprime les tables existantes et leurs données.

#### Méthode 2 — Sequelize CLI

Le projet dispose de trois migrations et de trois seeders
permettant de créer et d'alimenter la base avec Sequelize.

Depuis le dossier `backend`, installer les dépendances :

```bash
npm install
```

Créer une base MySQL vide, par exemple :

`trouve-ton-artisan-test`

Vérifier les paramètres de connexion de l'environnement
`test` dans `backend/config/config.json`.

Exécuter les migrations :

```bash
npx sequelize-cli db:migrate --env test
```

Exécuter ensuite les seeders :

```bash
npx sequelize-cli db:seed:all --env test
```

Les migrations créent les tables dans cet ordre :

1. categories
2. specialities
3. artisans

Les seeders insèrent les données dans le même ordre.

#### Données attendues

| Table | Nombre d'enregistrements |
|---|---:|
| categories | 4 |
| specialities | 15 |
| artisans | 17 |

Les deux méthodes produisent la même structure métier.

Les modèles Sequelize sont ensuite utilisés par l'API
Express pour accéder aux données.

Important : la configuration Sequelize CLI
(`config/config.json`) est distincte du fichier `.env`
utilisé par l'application.

Les migrations et les seeders doivent être exécutés
uniquement sur une base destinée à être initialisée.
Ne pas les relancer sur une base de production déjà remplie.


### 5.3 Configurer le backend

Dans `backend/`, créer un fichier **`.env` local** avec les noms de variables suivants, en adaptant les paramètres MySQL à son installation :

```dotenv
DB_NAME=trouve-ton-artisan
DB_USER=VOTRE_UTILISATEUR_MYSQL
DB_PASSWORD=VOTRE_MOT_DE_PASSE_MYSQL
DB_HOST=localhost
PORT=5000
FRONTEND_URL=http://localhost:5173
```

`DB_PASSWORD` peut être vide uniquement si la configuration locale MySQL le prévoit. `FRONTEND_URL` définit l'origine autorisée par la configuration CORS du backend.

Dans un terminal :

```bash
cd backend
npm install
npm start
```

Le script `npm start` lance `node app.js`. Pour relancer automatiquement le serveur lors des modifications, utiliser `npm run dev` (Nodemon).

L'API locale est alors accessible, par défaut, à **http://localhost:5000**.

### 5.4 Configurer et lancer le frontend

Dans `frontend/`, créer ou adapter son fichier **`.env` local** :

```dotenv
VITE_API_URL=http://localhost:5000
```

Puis, dans **un second terminal** :

```bash
cd frontend
npm install
npm run dev
```

Ouvrir l'adresse indiquée par Vite, généralement **http://localhost:5173**.

> Le frontend et le backend doivent tous deux être démarrés. Les variables préfixées par `VITE_` sont intégrées au code accessible dans le navigateur : **ne jamais y placer de mot de passe ni de clé secrète**.

## 6. API — principales routes en lecture

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/artisans` | Tous les artisans, avec spécialité et catégorie |
| `GET` | `/api/artisans?categoryId=2` | Artisans d'une catégorie (exemple : Bâtiment) |
| `GET` | `/api/artisans/:id` | Détail d'un artisan |
| `GET` | `/api/category` | Liste des catégories |
| `GET` | `/api/category/:id` | Une catégorie |
| `GET` | `/api/speciality` | Liste des spécialités |
| `GET` | `/api/speciality/:id` | Une spécialité |

Exemple de test :

```text
http://localhost:5000/api/artisans?categoryId=2
```

Le filtre `categoryId` est validé dans le contrôleur et appliqué par Sequelize dans le service avec une jointure sur les spécialités. Un identifiant de catégorie invalide renvoie une réponse HTTP `400`.

**Sécurité :** seules les routes de consultation (`GET`) sont actuellement exposées pour les artisans, catégories et spécialités. Les routes d'écriture (`POST`, `PUT`, `PATCH`, `DELETE`) ont été désactivées dans les routeurs en attendant un système d'authentification et d'autorisation administrateur. La configuration CORS limite les origines navigateur autorisées ; **CORS n'est pas un mécanisme d'authentification**.

## 7. Construire et déployer

Dans le dossier `frontend/` :

```bash
npm run build
```

La commande produit le répertoire `frontend/dist/`.

### Configuration de production

Le projet utilise `VITE_API_URL` pour joindre l'API. Pour le déploiement actuel sur Alwaysdata, configurer le frontend **avant de générer le build** :

```dotenv
# frontend/.env.production
VITE_API_URL=https://trouve-ton-artisan.alwaysdata.net
```

Vite intègre cette valeur lors du build : modifier le fichier d'environnement **après** `npm run build` ne modifie pas un `dist/` déjà généré.

Sur l'hébergement Alwaysdata utilisé pour ce projet :

- Le site Node.js démarre l'application avec **`node app.js`** depuis le dossier `backend/`.
- Le serveur Express sert les fichiers statiques depuis **`frontend/dist/`** et renvoie `index.html` sur les routes du frontend afin de laisser React Router gérer la navigation.
- Le fichier **`backend/.env` du serveur doit conserver les paramètres MySQL et l'origine frontend propres à Alwaysdata**. Il ne faut jamais le remplacer par le `.env` local.
- Ne pas transférer les dossiers **`node_modules/` de Windows** sur l'hébergement. Installer les dépendances dans l'environnement serveur si nécessaire.

Le transfert et la configuration du service Node.js sont à effectuer uniquement avec une sauvegarde préalable et les paramètres adaptés à l'hébergement.

## 8. Tests fonctionnels manuels

Après démarrage de l'API et du frontend, vérifier :

1. La page d'accueil et l'affichage des trois meilleurs artisans.
2. Chacune des quatre catégories et le filtrage associé.
3. La recherche par nom, ville et spécialité.
4. L'ouverture et la fermeture des fenêtres modales, avec les photos des catégories.
5. Le comportement du formulaire de contact (`mailto:`), avec une messagerie configurée.
6. La navigation mobile, tablette et ordinateur.
7. La page 404 sur une route inconnue.
8. L'accès aux routes API et les réponses aux filtres invalides.

Le fichier `frontend/package.json` propose aussi `npm run lint`. Aucun test automatisé complet n'est défini dans le projet fourni ; la commande `npm test` du backend est un script de remplacement.

## 9. Limites connues et travaux possibles

- Les messages du formulaire **ne sont pas envoyés depuis le serveur** : `mailto:` ouvre le logiciel de messagerie du visiteur.
- Les liens du pied de page renvoient à la page 404 tant que leurs pages dédiées ne sont pas développées.
- Une authentification administrateur serait nécessaire avant d'exposer des opérations de modification des données.

---

*Projet pédagogique — Trouve ton artisan, 2026.*
