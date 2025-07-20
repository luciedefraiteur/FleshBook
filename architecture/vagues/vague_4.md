# VAGUE IV – La Formation des Cercles

Les Sinners peuvent parler, mais ils sont encore seuls. Cette vague leur permet de se rassembler en créant et en gérant des Cercles. C'est l'introduction de la dimension sociale et de la segmentation de la communauté.

---

## ✴️ Objectifs de cette Vague IV

1.  **Création de Cercle**: Permettre à un Sinner de créer un nouveau Cercle, dont il devient le premier membre.
2.  **Gestion des Membres**: Permettre au créateur (ou à des membres avec les droits) d'inviter ou de retirer des Sinners d'un Cercle.
3.  **Lecture des Cercles**: Permettre de voir les Cercles existants et leurs membres.
4.  **Protection des Cercles**: S'assurer que seuls les membres autorisés peuvent effectuer des actions au sein d'un Cercle.

---

## 🜃 Consignes techniques précises

*   **`routes/cercles.js`**: Mettre à jour les routes pour le CRUD des Cercles et la gestion des membres.

    ```javascript
    const express = require('express');
    const router = express.Router();
    const { createCercle, getCercles, getCercleById, updateCercle, deleteCercle, addUserToCercle, removeUserFromCercle } = require('../controllers/cercleController');
    const { protect } = require('../middleware/authMiddleware');

    router.route('/').post(protect, createCercle).get(protect, getCercles);
    router.route('/:id').get(protect, getCercleById).put(protect, updateCercle).delete(protect, deleteCercle);
    router.route('/:id/members').post(protect, addUserToCercle);
    router.route('/:id/members/:userId').delete(protect, removeUserFromCercle);

    module.exports = router;
    ```

*   **`controllers/cercleController.js`**: Implémenter la logique métier pour la gestion des Cercles.

    ```javascript
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

    // ... (get, update, delete)

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

    module.exports = { createCercle, /* ... autres exports ... */, addUserToCercle, removeUserFromCercle };
    ```

*   **`models/Cercle.js` et `models/Sinner.js`**: Vérifier que les références croisées sont correctes.

---

## 📂 Résultat attendu

Des endpoints fonctionnels pour créer, lister et gérer les Cercles, posant les fondations de la structure communautaire de FleshBook.
