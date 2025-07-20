# VAGUE III – L'Incarnation de l'Offrande

Maintenant que les Sinners peuvent être authentifiés, il est temps de leur donner une voix. Cette vague se concentre sur l'implémentation complète du cycle de vie de l'Offrande (CRUD - Create, Read, Update, Delete). C'est le premier acte de création tangible au sein de FleshBook.

---

## ✴️ Objectifs de cette Vague III

1.  **Création d'Offrande**: Permettre à un Sinner authentifié de soumettre une Offrande.
2.  **Lecture des Offrandes**: Permettre de récupérer les Offrandes, que ce soit collectivement ou individuellement.
3.  **Modification et Rétractation**: Donner au créateur d'une Offrande le pouvoir de la modifier ou de la supprimer.
4.  **Protection des Actes**: S'assurer que seules les actions autorisées sont possibles (un Sinner ne peut modifier que sa propre Offrande).

---

## 🜃 Consignes techniques précises

*   **`routes/offrandes.js`**: Mettre à jour le fichier pour définir les routes CRUD et les protéger avec le middleware `protect`.

    ```javascript
    const express = require('express');
    const router = express.Router();
    const { createOffrande, getOffrandes, getOffrandeById, updateOffrande, deleteOffrande } = require('../controllers/offrandeController');
    const { protect } = require('../middleware/authMiddleware');

    router.route('/').post(protect, createOffrande).get(protect, getOffrandes);
    router.route('/:id').get(protect, getOffrandeById).put(protect, updateOffrande).delete(protect, deleteOffrande);

    module.exports = router;
    ```

*   **`controllers/offrandeController.js`**: Implémenter la logique métier pour chaque action CRUD.

    ```javascript
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
    ```

*   **`models/Offrande.js`**: S'assurer que le modèle est correct (normalement aucune modification n'est nécessaire depuis la Vague I).

---

## 📂 Résultat attendu

Un endpoint `/api/offrandes` entièrement fonctionnel et sécurisé, permettant aux utilisateurs authentifiés de gérer leurs propres créations. Le coeur de l'application commence à battre.
