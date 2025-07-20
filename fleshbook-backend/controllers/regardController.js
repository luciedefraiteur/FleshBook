const Offrande = require('../models/Offrande');
const Sinner = require('../models/Sinner');

// @desc    Récupérer le feed principal (Regard Abyssal)
// @route   GET /api/regard
// @access  Privé
const getRegardAbyssal = async (req, res) => {
    // 1. Trouver les cercles de l'utilisateur
    const sinner = await Sinner.findById(req.user._id);
    const userCercles = sinner.cercles;

    // 2. Trouver toutes les offrandes faites dans ces cercles
    const offrandes = await Offrande.find({ cercle: { $in: userCercles } })
        .populate('utilisateur', 'nom')
        .populate('cercle', 'nom')
        .sort({ date: -1 }); // Les plus récentes en premier

    res.json(offrandes);
};

module.exports = { getRegardAbyssal };