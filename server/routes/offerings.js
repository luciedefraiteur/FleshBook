const express = require('express');
const router = express.Router();
const Offering = require('../models/Offering');
const Sinner = require('../models/Sinner');
const jwt = require('jsonwebtoken');

// Middleware pour vérifier le pacte (auth)
function verifyPact(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Pacte requis.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.sinnerId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: 'Pacte invalide.' });
  }
}

// Créer une offrande
router.post('/offrande', verifyPact, async (req, res) => {
  try {
    const { text, image, video } = req.body;
    const offering = new Offering({
      sinner: req.sinnerId,
      text,
      image,
      video
    });
    await offering.save();
    res.status(201).json(offering);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// L'Abîme : fil d'actualités
router.get('/abime', verifyPact, async (req, res) => {
  try {
    const offerings = await Offering.find().sort({ createdAt: -1 }).populate('sinner', 'name avatar');
    res.json(offerings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
