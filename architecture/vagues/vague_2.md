
#  VAGUE II – L'Éveil du Sinner

Avec l'ossature en place, cette vague insuffle la première étincelle de vie dans le backend. L'objectif est de rendre le système capable de reconnaître ses fidèles. Nous allons établir la connexion à la nécropole (base de données) et forger le pacte d'authentification (JWT).

---

## ✴️ Objectifs de cette Vague II

1.  **Connexion à la Nécropole (MongoDB)**: Activer la connexion à la base de données pour persister les âmes et leurs créations.
2.  **Forge du Pacte (Authentification)**:
    *   Permettre à un `Sinner` de s'enregistrer (`/register`).
    *   Hasher et saler son mot de passe pour protéger son serment.
    *   Lui permettre de s'identifier (`/login`).
    *   Générer un Sceau Sacré (JWT) pour qu'il puisse prouver son identité.
3.  **Mise en place des Gardiens (Middleware)**: Créer le middleware qui vérifiera la validité du Sceau (JWT) à chaque requête sur une route protégée.

---

## 🜃 Consignes techniques précises

*   **Dépendances**: Assure-toi que `bcryptjs` et `jsonwebtoken` sont bien installés.
    ```bash
    npm install bcryptjs jsonwebtoken
    ```

*   **`config/db.js`**: Implémenter la logique de connexion Mongoose.

    ```javascript
    const mongoose = require('mongoose');
    const connectDB = async () => {
      try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log(`MongoDB Connecté: ${conn.connection.host}`);
      } catch (error) {
        console.error(`Erreur: ${error.message}`);
        process.exit(1);
      }
    };
    module.exports = connectDB;
    ```

*   **`models/Sinner.js`**: Mettre à jour le modèle pour hasher le mot de passe avant de le sauvegarder.

    ```javascript
    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');

    const SinnerSchema = new mongoose.Schema({
      // ... (champs existants)
      nom: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      // ... (champs existants)
    });

    // Crypter le mot de passe avant de sauvegarder
    SinnerSchema.pre('save', async function (next) {
      if (!this.isModified('password')) {
        next();
      }
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    });

    // Méthode pour comparer les mots de passe
    SinnerSchema.methods.matchPassword = async function (enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    };

    module.exports = mongoose.model('Sinner', SinnerSchema);
    ```

*   **Créer `routes/auth.js` et `controllers/authController.js`**:
    *   `routes/auth.js`: Définir les routes `POST /register` et `POST /login`.
    *   `controllers/authController.js`: Implémenter la logique de création de Sinner, de vérification de mot de passe et de génération de JWT.

*   **`middleware/authMiddleware.js`**: Remplacer le placeholder par une vraie logique de vérification de JWT.

    ```javascript
    const jwt = require('jsonwebtoken');
    const Sinner = require('../models/Sinner');

    const protect = async (req, res, next) => {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
          token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = await Sinner.findById(decoded.id).select('-password');
          next();
        } catch (error) {
          res.status(401).json({ message: 'Non autorisé, token invalide' });
        }
      }
      if (!token) {
        res.status(401).json({ message: 'Non autorisé, pas de token' });
      }
    };
    module.exports = { protect };
    ```

*   **`index.js`**: Intégrer la connexion à la DB et les nouvelles routes d'authentification.

---

## 📂 Résultat attendu

Un backend fonctionnel pour l'enregistrement et la connexion des utilisateurs, avec des routes prêtes à être protégées. La base de données est vivante et les Sinners peuvent désormais recevoir leur marque.
