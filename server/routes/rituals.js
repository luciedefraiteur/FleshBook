const express = require('express');
const router = express.Router();
const Sinner = require('../models/Sinner');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Pacte d'inscription
router.post('/pacte', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const sinner = new Sinner({ email, password: hash, name });
    await sinner.save();
    res.status(201).json({ message: 'Pécheur lié par le pacte.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rituel de connexion
router.post('/rituel', async (req, res) => {
  try {
    const { email, password } = req.body;
    const sinner = await Sinner.findOne({ email });
    if (!sinner) return res.status(404).json({ error: 'Pécheur inconnu.' });
    const valid = await bcrypt.compare(password, sinner.password);
    if (!valid) return res.status(401).json({ error: 'Rituel refusé.' });
    const token = jwt.sign({ id: sinner._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, sinner });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
