require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// --- Test route ---
app.get('/', (req, res) => {
  res.send('Bienvenue sur FleshBook API');
});

// --- Routes ---

const ritualsRoutes = require('./routes/rituals');
const offeringsRoutes = require('./routes/offerings');
const pecheursRoutes = require('./routes/pecheurs');

app.use('/sacrements', ritualsRoutes); // endpoints d'authentification
app.use('/offrandes', offeringsRoutes); // endpoints de publication et fil
app.use('/pecheurs', pecheursRoutes); // endpoints pour relations et profils

// --- MongoDB connection ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fleshbook';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur API FleshBook lancé sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB:', err);
  });
