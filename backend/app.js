require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const cors = require('cors');
const indexRoutes = require('./routes/index.routes');
const Artisan = require('./models/artisanModel');

// Connexion BDD
sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie.'))
  .catch(err => console.error('Erreur de connexion :', err));
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Synchronisation de la base
sequelize.sync({ alter: true }) // alter pour dev seulement
  .then(() => {
    console.log('Tables synchronisées avec la base');
  })
  .catch((err) => {
    console.error('Erreur de synchronisation :', err);
  });

  // Test route
  //app.get('/', (req, res) => {
   // res.send('API Trouve ton artisan - oK !');
 // });

const artisanRoutes = require('./routes/artisan.routes');
app.use('/api/artisans', artisanRoutes);
app.use('/api/', indexRoutes);

// Sert les fichiers statiques du build React (dist/)
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Catch-all : toute route qui n'est pas /api/... renvoie index.html
// (nécessaire pour que React Router gère la navigation côté client)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

//Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});