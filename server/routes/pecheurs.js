const express = require('express');
const router = express.Router();
const Relation = require('../models/Relation');
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

// Récupérer les enchaînés (ceux que je suis) et les corrompus (ceux qui me suivent)
router.get('/relations', verifyPact, async (req, res) => {
  try {
    const sinnerId = req.sinnerId;
    // Enchaînés : ceux que je suis
    const enchaines = await Relation.find({ follower: sinnerId })
      .populate('followed', 'name avatar')
      .exec();
    // Corrompus : ceux qui me suivent
    const corrompus = await Relation.find({ followed: sinnerId })
      .populate('follower', 'name avatar')
      .exec();
    res.json({
      enchaines: enchaines.map(r => r.followed),
      corrompus: corrompus.map(r => r.follower)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
