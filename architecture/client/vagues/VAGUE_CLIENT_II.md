# VAGUE CLIENT II – L'Éveil des Formulaires

Cette vague se concentre sur l'intégration des composants atomiques (`Input`, `Button`) dans les formulaires d'authentification et sur l'amélioration de leur gestion d'état. L'objectif est de rendre les formulaires plus robustes, réactifs et esthétiquement cohérents avec le Design System.

---

## ✴️ Objectifs de cette Vague II

1.  **Intégration des Composants**: Remplacer les éléments HTML natifs (`<input>`, `<button>`) par les composants `Input` et `Button` dans `ConnexionForm.jsx` et `InscriptionForm.jsx`.
2.  **Gestion des Erreurs de Formulaire**: Implémenter une gestion simple des erreurs de validation côté client pour les formulaires d'authentification.
3.  **Feedback Visuel**: Utiliser les propriétés `loading` et `disabled` des boutons pour fournir un feedback visuel pendant les soumissions.

---

## 🜃 Consignes techniques précises

*   **`client/src/features/auth/ConnexionForm.jsx`**: Modifier le composant pour utiliser `<Input>` et `<Button>`.

    ```javascript
    import React, { useState } from 'react';
    import Input from '../../components/common/Input';
    import Button from '../../components/common/Button';
    import './forms.scss';

    export default function ConnexionForm({ onLogin, loading }) {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
          setError('Veuillez remplir tous les champs.');
          return;
        }
        await onLogin({ email, password });
      };

      return (
        <form onSubmit={handleSubmit} className="auth-form">
          <h3 className="auth-form-title">Connexion (Rituel)</h3>
          {error && <p className="auth-form-error">{error}</p>}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!error && !email}
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!error && !password}
          />
          <Button type="submit" loading={loading}>
            Accomplir le rituel
          </Button>
        </form>
      );
    }
    ```

*   **`client/src/features/auth/InscriptionForm.jsx`**: Modifier le composant pour utiliser `<Input>` et `<Button>`.

    ```javascript
    import React, { useState } from 'react';
    import Input from '../../components/common/Input';
    import Button from '../../components/common/Button';
    import './forms.scss';

    export default function InscriptionForm({ onRegister, loading }) {
      const [email, setEmail] = useState('');
      const [name, setName] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !name || !password) {
          setError('Veuillez remplir tous les champs.');
          return;
        }
        await onRegister({ email, name, password });
      };

      return (
        <form onSubmit={handleSubmit} className="auth-form">
          <h3 className="auth-form-title">Inscription (Pacte)</h3>
          {error && <p className="auth-form-error">{error}</p>}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!error && !email}
          />
          <Input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={e => setName(e.target.value)}
            error={!!error && !name}
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!error && !password}
          />
          <Button type="submit" loading={loading}>
            Sceller le pacte
          </Button>
        </form>
      );
    }
    ```

*   **`client/src/features/auth/forms.scss`**: Mettre à jour les styles pour correspondre aux nouvelles classes et pour inclure le style des messages d'erreur.

    ```scss
    @import '../../styles/_variables.scss';

    .auth-form {
      background: $dark-bg;
      border-radius: $spacing-sm;
      padding: $spacing-lg;
      margin: $spacing-md 0;
      box-shadow: 0 0 $spacing-sm $deep-red;

      &-title {
        color: $blood;
        font-family: 'Cinzel', serif;
        margin-bottom: $spacing-md;
        text-align: center;
      }

      &-error {
        color: #b00;
        margin-bottom: $spacing-sm;
        text-align: center;
      }

      .common-input {
        margin-bottom: $spacing-sm; // Ajustement de la marge pour les inputs
      }

      .common-button {
        margin-top: $spacing-md;
      }
    }
    ```

---

## 📂 Résultat attendu

Des formulaires d'authentification visuellement améliorés et plus robustes, offrant une meilleure expérience utilisateur grâce à l'intégration des composants atomiques et à une gestion d'erreur de base.
