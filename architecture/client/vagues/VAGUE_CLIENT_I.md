# VAGUE CLIENT I – Les Fondations Visuelles

Cette première vague d'implémentation côté client vise à établir le langage visuel fondamental de FleshBook. L'objectif est de mettre en place les éléments de base du Design System, garantissant une cohérence esthétique dès le début du développement.

---

## ✴️ Objectifs de cette Vague I

1.  **Intégration des Polices**: Charger et configurer les polices `Cinzel`, `UnifrakturCook`, `EB Garamond`.
2.  **Variables SASS**: Définir la palette de couleurs et les variables d'espacement dans `_variables.scss`.
3.  **Styles de Base**: Appliquer les styles globaux (reset, typographie de base) dans `_base.scss`.
4.  **Animations Core**: S'assurer que les animations thématiques (`bloodRipple`, `hellGlow`, etc.) sont correctement définies et utilisables.
5.  **Composants Atomiques**: Créer des composants React simples et réutilisables pour les éléments UI de base (ex: `Button`, `Input`).

---

## 🜃 Consignes techniques précises

*   **Polices**: Modifier `index.html` pour importer les polices via Google Fonts ou les télécharger localement si nécessaire. S'assurer que les `font-family` sont correctement définies dans `_base.scss`.

*   **`client/src/styles/_variables.scss`**: Remplir ce fichier avec les variables de couleurs et d'espacement définies dans le `PLAN_DESIGN_SYSTEM.md`.

*   **`client/src/styles/_base.scss`**: Intégrer les styles de base pour `body`, `h1-h6`, `p`, `a`, etc., en utilisant les variables définies.

*   **`client/src/styles/_animations.scss`**: Vérifier que les keyframes et les classes d'animation sont présentes et fonctionnelles.

*   **`client/src/components/common/Button.jsx`**: Créer un composant `Button` stylisé avec les couleurs et typographies définies, supportant les états `disabled` et `loading`.

    ```javascript
    // Exemple de Button.jsx
    import React from 'react';
    import './Button.scss'; // Créer Button.scss

    const Button = ({ children, onClick, type = 'button', disabled = false, loading = false }) => {
      return (
        <button type={type} onClick={onClick} disabled={disabled || loading} className="common-button">
          {loading ? 'Chargement...' : children}
        </button>
      );
    };
    export default Button;
    ```

*   **`client/src/components/common/Input.jsx`**: Créer un composant `Input` stylisé, avec gestion du focus et des erreurs.

    ```javascript
    // Exemple de Input.jsx
    import React from 'react';
    import './Input.scss'; // Créer Input.scss

    const Input = ({ type = 'text', placeholder, value, onChange, error = false }) => {
      return (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`common-input ${error ? 'common-input--error' : ''}`}
        />
      );
    };
    export default Input;
    ```

*   **Fichiers SCSS pour les composants**: Créer `client/src/components/common/Button.scss` et `client/src/components/common/Input.scss` et les importer dans `client/src/styles/main.scss`.

---

## 📂 Résultat attendu

Une application avec une identité visuelle forte et cohérente. Les éléments de base de l'UI sont stylisés selon le Design System, prêts à être utilisés dans les vagues suivantes.
