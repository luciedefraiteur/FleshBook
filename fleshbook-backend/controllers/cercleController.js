const Cercle = require('../models/Cercle');
const Sinner = require('../models/Sinner');

// @desc    Créer un nouveau cercle
// @route   POST /api/cercles
// @access  Privé
const createCercle = async (req, res) => {
  const { nom } = req.body;
  const cercle = new Cercle({
    nom,
    utilisateurs: [req.user._id],
    actif: true, // Un cercle est actif à sa création
  });
  const createdCercle = await cercle.save();
  // Ajouter le cercle à la liste des cercles du Sinner
  const sinner = await Sinner.findById(req.user._id);
  sinner.cercles.push(createdCercle._id);
  await sinner.save();
  res.status(201).json(createdCercle);
};

// @desc    Récupérer tous les cercles
// @route   GET /api/cercles
// @access  Privé
const getCercles = async (req, res) => {
    const cercles = await Cercle.find({}).populate('utilisateurs', 'nom');
    res.json(cercles);
};

// @desc    Récupérer un cercle par ID
// @route   GET /api/cercles/:id
// @access  Privé
const getCercleById = async (req, res) => {
    const cercle = await Cercle.findById(req.params.id).populate('utilisateurs', 'nom');
    if (cercle) {
        res.json(cercle);
    } else {
        res.status(404).json({ message: 'Cercle non trouvé' });
    }
};

// @desc    Mettre à jour un cercle
// @route   PUT /api/cercles/:id
// @access  Privé
const updateCercle = async (req, res) => {
    const cercle = await Cercle.findById(req.params.id);
    // TODO: Ajouter une logique de droits (ex: seul le créateur peut modifier)
    if(cercle) {
        cercle.nom = req.body.nom || cercle.nom;
        const updatedCercle = await cercle.save();
        res.json(updatedCercle);
    } else {
        res.status(404).json({ message: 'Cercle non trouvé' });
    }
};

// @desc    Supprimer un cercle
// @route   DELETE /api/cercles/:id
// @access  Privé
const deleteCercle = async (req, res) => {
    const cercle = await Cercle.findById(req.params.id);
    // TODO: Ajouter une logique de droits (ex: seul le créateur peut supprimer)
    if(cercle) {
        await cercle.remove();
        // TODO: Retirer le cercle des listes des utilisateurs
        res.json({ message: 'Cercle supprimé' });
    } else {
        res.status(404).json({ message: 'Cercle non trouvé' });
    }
};

// @desc    Ajouter un utilisateur à un cercle
// @route   POST /api/cercles/:id/members
// @access  Privé
const addUserToCercle = async (req, res) => {
  const cercle = await Cercle.findById(req.params.id);
  const userToAdd = await Sinner.findById(req.body.userId);

  // TODO: Ajouter une vérification des droits (seul le créateur peut ajouter)

  if (cercle && userToAdd) {
    cercle.utilisateurs.push(userToAdd._id);
    userToAdd.cercles.push(cercle._id);
    await cercle.save();
    await userToAdd.save();
    res.json(cercle);
  } else {
    res.status(404).json({ message: 'Cercle ou utilisateur non trouvé' });
  }
};

// @desc    Retirer un utilisateur d'un cercle
// @route   DELETE /api/cercles/:id/members/:userId
// @access  Privé
const removeUserFromCercle = async (req, res) => {
  // TODO: Implémenter la logique
  res.status(501).json({ message: 'Non implémenté' });
};

module.exports = { createCercle, getCercles, getCercleById, updateCercle, deleteCercle, addUserToCercle, removeUserFromCercle };