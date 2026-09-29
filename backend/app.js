require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./config/db');
const cors = require('cors');
const indexRoutes = require('./routes/index.routes');

// Connexion BDD
sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie.'))
  .catch(err => console.error('Erreur de connexion :', err));

// Middlewares
// CORS restreint à l'URL du frontend (définie en environnement), pas ouvert à tout le monde
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', indexRoutes);

// Sert les fichiers statiques du build React (dist/)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Catch-all : toute route qui n'est pas /api/... renvoie index.html
// (nécessaire pour que React Router gère la navigation côté client)
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});