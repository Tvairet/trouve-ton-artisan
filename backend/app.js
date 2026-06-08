require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const cors = require('cors');
const indexRoutes = require('./routes/indexRoutes');
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

const artisanRoutes = require('./routes/artisanRoutes');
app.use('/api/artisans', artisanRoutes);
app.use('/api/', indexRoutes);

//Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server lancé sur http://localhost:${PORT}');
});