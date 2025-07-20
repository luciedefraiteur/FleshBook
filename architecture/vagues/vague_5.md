# VAGUE V – La Résonance des Échos

Les Cercles sont formés et les Offrandes sont faites. Il est maintenant temps de donner vie aux interactions. Cette vague se concentre sur l'implémentation des Échos (les commentaires) et la finalisation de la gestion des Cercles, rendant la structure sociale pleinement interactive.

---

## ✴️ Objectifs de cette Vague V

1.  **Finaliser la Gestion des Cercles**: Implémenter les fonctionnalités de lecture, mise à jour et suppression des Cercles laissées en suspens dans la vague précédente.
2.  **Création d'Écho**: Permettre à un Sinner de publier un Écho en réponse à une Offrande.
3.  **Lecture des Échos**: Permettre de récupérer tous les Échos associés à une Offrande spécifique.
4.  **Gestion des Échos**: Permettre à l'auteur d'un Écho de le modifier ou de le supprimer.
5.  **Protection des Interactions**: Renforcer la sécurité pour que seules les actions autorisées soient possibles sur les Cercles et les Échos.

---

## 🜃 Consignes techniques précises

*   **`controllers/cercleController.js`**: Compléter les fonctions restantes.

    ```javascript
    // ... (createCercle et addUserToCercle existent déjà)

    // @desc    Récupérer tous les cercles
    const getCercles = async (req, res) => {
      const cercles = await Cercle.find({}).populate('utilisateurs', 'nom');
      res.json(cercles);
    };

    // @desc    Récupérer un cercle par ID
    const getCercleById = async (req, res) => {
      const cercle = await Cercle.findById(req.params.id).populate('utilisateurs', 'nom');
      if (cercle) {
        res.json(cercle);
      } else {
        res.status(404).json({ message: 'Cercle non trouvé' });
      }
    };

    // @desc    Mettre à jour un cercle
    // NOTE: Seul le nom du cercle peut être modifié pour l'instant.
    // TODO: Ajouter une logique de droits (ex: seul le créateur peut modifier)
    const updateCercle = async (req, res) => {
        const cercle = await Cercle.findById(req.params.id);
        if(cercle) {
            cercle.nom = req.body.nom || cercle.nom;
            const updatedCercle = await cercle.save();
            res.json(updatedCercle);
        } else {
            res.status(404).json({ message: 'Cercle non trouvé' });
        }
    };
    
    // TODO: Ajouter une logique de droits (ex: seul le créateur peut supprimer)
    const deleteCercle = async (req, res) => {
        const cercle = await Cercle.findById(req.params.id);
        if(cercle) {
            await cercle.remove();
            // TODO: Retirer le cercle des listes des utilisateurs
            res.json({ message: 'Cercle supprimé' });
        } else {
            res.status(404).json({ message: 'Cercle non trouvé' });
        }
    };

    // TODO: Ajouter une logique de droits
    const removeUserFromCercle = async (req, res) => {
        // Logique pour retirer un utilisateur d'un cercle
        res.status(501).json({ message: 'Non implémenté' });
    }
    ```

*   **`routes/echos.js`**: Définir les routes pour le CRUD des Échos.

    ```javascript
    const express = require('express');
    const router = express.Router();
    const { createEcho, getEchosForOffrande, updateEcho, deleteEcho } = require('../controllers/echoController');
    const { protect } = require('../middleware/authMiddleware');

    // Note: On passe l'ID de l'offrande en paramètre pour récupérer les échos
    router.route('/offrande/:offrandeId').get(protect, getEchosForOffrande);
    router.route('/').post(protect, createEcho);
    router.route('/:id').put(protect, updateEcho).delete(protect, deleteEcho);

    module.exports = router;
    ```

*   **`controllers/echoController.js`**: Implémenter la logique métier pour les Échos.

    ```javascript
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
    ```

---

## 📂 Résultat attendu

Un système social de base pleinement fonctionnel. Les Sinners peuvent créer des communautés (Cercles), y partager des créations (Offrandes) et interagir avec celles-ci (Échos).
