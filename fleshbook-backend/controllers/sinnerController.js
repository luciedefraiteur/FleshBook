const Sinner = require('../models/Sinner');

// @desc    Récupérer le profil du Sinner connecté
// @route   GET /api/sinners/profile
// @access  Privé
const getSinnerProfile = async (req, res) => {
  const sinner = await Sinner.findById(req.user._id).populate('cercles', 'nom');
  if (sinner) {
    res.json(sinner);
  } else {
    res.status(404).json({ message: 'Sinner non trouvé' });
  }
};

// @desc    Mettre à jour le profil du Sinner
// @route   PUT /api/sinners/profile
// @access  Privé
const updateSinnerProfile = async (req, res) => {
  const sinner = await Sinner.findById(req.user._id);
  if (sinner) {
    sinner.nom = req.body.nom || sinner.nom;
    sinner.email = req.body.email || sinner.email;
    if (req.body.password) {
      sinner.password = req.body.password; // Le hook .pre('save') s'occupera du hashage
    }
    const updatedSinner = await sinner.save();
    res.json(updatedSinner);
  } else {
    res.status(404).json({ message: 'Sinner non trouvé' });
  }
};

// @desc    Récupérer un profil Sinner par ID
// @route   GET /api/sinners/:id
// @access  Privé
const getSinnerById = async (req, res) => {
    // On ne retourne que les informations non-sensibles
    const sinner = await Sinner.findById(req.params.id).select('-password -email').populate('cercles', 'nom');
    if(sinner) {
        res.json(sinner);
    } else {
        res.status(404).json({ message: 'Sinner non trouvé' });
    }
};

module.exports = { getSinnerProfile, updateSinnerProfile, getSinnerById };