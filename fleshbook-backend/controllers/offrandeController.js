const Offrande = require('../models/Offrande');

// @desc    Créer une nouvelle offrande
// @route   POST /api/offrandes
// @access  Privé
const createOffrande = async (req, res) => {
  const { contenu, type, cercle } = req.body;
  const offrande = new Offrande({
    contenu,
    type,
    cercle, // Optionnel, peut être ajouté plus tard
    utilisateur: req.user._id,
  });
  const createdOffrande = await offrande.save();
  res.status(201).json(createdOffrande);
};

// @desc    Récupérer toutes les offrandes
// @route   GET /api/offrandes
// @access  Privé
const getOffrandes = async (req, res) => {
  const offrandes = await Offrande.find({}).populate('utilisateur', 'nom');
  res.json(offrandes);
};

// @desc    Récupérer une offrande par ID
// @route   GET /api/offrandes/:id
// @access  Privé
const getOffrandeById = async (req, res) => {
  const offrande = await Offrande.findById(req.params.id);
  if (offrande) {
    res.json(offrande);
  } else {
    res.status(404).json({ message: 'Offrande non trouvée' });
  }
};

// @desc    Mettre à jour une offrande
// @route   PUT /api/offrandes/:id
// @access  Privé
const updateOffrande = async (req, res) => {
  const { contenu, type } = req.body;
  const offrande = await Offrande.findById(req.params.id);

  if (offrande.utilisateur.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Action non autorisée' });
  }

  if (offrande) {
    offrande.contenu = contenu || offrande.contenu;
    offrande.type = type || offrande.type;
    const updatedOffrande = await offrande.save();
    res.json(updatedOffrande);
  } else {
    res.status(404).json({ message: 'Offrande non trouvée' });
  }
};

// @desc    Supprimer une offrande
// @route   DELETE /api/offrandes/:id
// @access  Privé
const deleteOffrande = async (req, res) => {
  const offrande = await Offrande.findById(req.params.id);

  if (offrande.utilisateur.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Action non autorisée' });
  }

  if (offrande) {
    await offrande.remove();
    res.json({ message: 'Offrande supprimée' });
  } else {
    res.status(404).json({ message: 'Offrande non trouvée' });
  }
};

module.exports = { createOffrande, getOffrandes, getOffrandeById, updateOffrande, deleteOffrande };