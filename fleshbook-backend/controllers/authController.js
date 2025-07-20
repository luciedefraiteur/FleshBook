const Sinner = require('../models/Sinner');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerSinner = async (req, res) => {
  const { nom, email, password } = req.body;

  const sinnerExists = await Sinner.findOne({ email });

  if (sinnerExists) {
    res.status(400).json({ message: 'Ce Sinner existe déjà' });
  }

  const sinner = await Sinner.create({
    nom,
    email,
    password,
  });

  if (sinner) {
    res.status(201).json({
      _id: sinner._id,
      nom: sinner.nom,
      email: sinner.email,
      token: generateToken(sinner._id),
    });
  } else {
    res.status(400).json({ message: 'Données invalides' });
  }
};

const loginSinner = async (req, res) => {
  const { email, password } = req.body;

  const sinner = await Sinner.findOne({ email });

  if (sinner && (await sinner.matchPassword(password))) {
    res.json({
      _id: sinner._id,
      nom: sinner.nom,
      email: sinner.email,
      token: generateToken(sinner._id),
    });
  } else {
    res.status(401).json({ message: 'Email ou mot de passe invalide' });
  }
};

module.exports = { registerSinner, loginSinner };