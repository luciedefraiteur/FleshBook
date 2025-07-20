const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

// Importer les routes
const authRoutes = require('./routes/auth');
const cercleRoutes = require('./routes/cercles');
const offrandeRoutes = require('./routes/offrandes');
const echoRoutes = require('./routes/echos');
const regardRoutes = require('./routes/regard');
const sinnerRoutes = require('./routes/sinners');

// Utiliser les routes
app.use('/api/auth', authRoutes);
app.use('/api/cercles', cercleRoutes);
app.use('/api/offrandes', offrandeRoutes);
app.use('/api/echos', echoRoutes);
app.use('/api/regard', regardRoutes);
app.use('/api/sinners', sinnerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`));