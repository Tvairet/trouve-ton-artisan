const express = require('express');
const app = express();

// Connexion BDD
sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie.'))
  .catch(err => console.error('Erreur de connexion :', err));
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server lancé sur http://localhost:${PORT}');
});