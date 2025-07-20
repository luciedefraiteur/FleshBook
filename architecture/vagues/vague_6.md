# VAGUE VI – Le Profil du Sinner et le Regard Abyssal

Les fondations sociales sont posées. Il est temps de donner aux Sinners une identité propre et un moyen de contempler l'activité de leurs Cercles. Cette vague se concentre sur la gestion des profils utilisateurs et sur la création d'un flux de contenu personnalisé.

---

## ✴️ Objectifs de cette Vague VI

1.  **Gestion du Profil Sinner**: Permettre aux utilisateurs de consulter et de mettre à jour leur propre profil.
2.  **Consultation Publique**: Permettre de consulter le profil (limité) d'autres Sinners.
3.  **Le Regard Abyssal (Feed)**: Implémenter une première version du flux de contenu principal, qui agrège les Offrandes des Cercles auxquels le Sinner appartient.

---

## 🜃 Consignes techniques précises

*   **`routes/sinners.js`**: Mettre à jour les routes pour la gestion des profils.

    ```javascript
    const express = require('express');
    const router = express.Router();
    const { getSinnerProfile, updateSinnerProfile, getSinnerById } = require('../controllers/sinnerController');
    const { protect } = require('../middleware/authMiddleware');

    router.route('/profile').get(protect, getSinnerProfile).put(protect, updateSinnerProfile);
    router.route('/:id').get(protect, getSinnerById);

    module.exports = router;
    ```

*   **`controllers/sinnerController.js`**: Implémenter la logique de gestion des profils.

    ```javascript
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
    ```

*   **`routes/regard.js`**: Mettre à jour la route pour le Regard Abyssal.

    ```javascript
    const express = require('express');
    const router = express.Router();
    const { getRegardAbyssal } = require('../controllers/regardController');
    const { protect } = require('../middleware/authMiddleware');

    router.route('/').get(protect, getRegardAbyssal);

    module.exports = router;
    ```

*   **`controllers/regardController.js`**: Implémenter la logique du Regard Abyssal.

    ```javascript
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
    ```

---

## 📂 Résultat attendu

Des profils utilisateurs fonctionnels et un flux de contenu de base qui rend l'application dynamique et engageante. Le Regard dans l'Abysse a commencé.
