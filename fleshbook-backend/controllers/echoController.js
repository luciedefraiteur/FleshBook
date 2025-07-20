const Echo = require('../models/Echo');
const Offrande = require('../models/Offrande');

// @desc    Créer un nouvel écho
const createEcho = async (req, res) => {
    const { contenu, offrandeId } = req.body;
    const offrande = await Offrande.findById(offrandeId);
    if (!offrande) return res.status(404).json({ message: 'Offrande non trouvée' });

    const echo = new Echo({
        contenu,
        utilisateur: req.user._id,
        offrande: offrandeId
    });

    const createdEcho = await echo.save();
    res.status(201).json(createdEcho);
};

// @desc    Récupérer les échos d'une offrande
const getEchosForOffrande = async (req, res) => {
    const echos = await Echo.find({ offrande: req.params.offrandeId }).populate('utilisateur', 'nom');
    res.json(echos);
};

// @desc    Mettre à jour un écho
const updateEcho = async (req, res) => {
    const echo = await Echo.findById(req.params.id);
    if (echo.utilisateur.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Action non autorisée' });
    }
    echo.contenu = req.body.contenu || echo.contenu;
    const updatedEcho = await echo.save();
    res.json(updatedEcho);
};

// @desc    Supprimer un écho
const deleteEcho = async (req, res) => {
    const echo = await Echo.findById(req.params.id);
    if (echo.utilisateur.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Action non autorisée' });
    }
    await echo.remove();
    res.json({ message: 'Écho supprimé' });
};

module.exports = { createEcho, getEchosForOffrande, updateEcho, deleteEcho };