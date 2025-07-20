# PLAN DE DESIGN SYSTEM – CLIENT FLESHBOOK

Ce plan établit les fondations visuelles et interactives de l'interface utilisateur de FleshBook, garantissant cohérence, scalabilité et une immersion profonde dans l'esthétique sombre et rituelle du projet.

---

## ✴️ Principes Fondamentaux

*   **Immersion**: Chaque élément doit contribuer à l'ambiance unique de FleshBook.
*   **Cohérence**: Uniformité visuelle et comportementale à travers toute l'application.
*   **Accessibilité**: Assurer une lisibilité et une utilisabilité pour tous les Sinners.
*   **Performance**: Les choix de design ne doivent pas compromettre la fluidité de l'expérience.

---

## 🎨 Éléments Visuels

### 1. Typographie

*   **Titres (H1, H2, H3)**: `Cinzel`, `UnifrakturCook` (pour les éléments rituels/sacrés).
    *   `Cinzel`: Élégante, forte, pour les titres principaux et les éléments importants.
    *   `UnifrakturCook`: Gothique, pour les accents thématiques, les titres de section spécifiques (ex: L'Abîme, Le Regard).
*   **Corps de Texte**: `EB Garamond` (pour la lisibilité et une touche classique/ancienne).
*   **Code/Monospace**: `Source Code Pro` (pour les éléments techniques ou de débogage).
*   **Hiérarchie**: Utilisation de tailles, poids et couleurs pour guider l'œil.

### 2. Palette de Couleurs

Inspirée des profondeurs et des rituels, la palette est dominée par les rouges sombres, les noirs abyssaux et les teintes de sang et d'os.

*   **Primaires**: `#0b0000` (Noir Abyssal), `#221012` (Rouge Profond).
*   **Accents**: `#990000` (Sang Séché), `#e10600` (Sang Frais / Éclat Rituel).
*   **Neutres**: `#f5e6e6` (Os / Texte Clair), `#a88` (Cendre / Texte Secondaire).
*   **Sémantiques**: `#b00` (Erreur / Danger), `#0b0` (Succès / Bénédiction).

### 3. Espacement et Grille

*   **Unités**: Utilisation de `rem` pour la scalabilité.
*   **Grille**: Système de grille flexible pour les mises en page réactives.
*   **Espacement**: Définition de variables SASS pour les marges et paddings (`$spacing-xs`, `$spacing-sm`, etc.).

### 4. Iconographie

*   **Style**: Minimaliste, vectoriel (SVG), avec des touches gothiques ou symboliques.
*   **Source**: Fichiers SVG intégrés ou icônes personnalisées.

### 5. Images et Médias

*   **Traitement**: Utilisation de filtres (ex: sépia, faible saturation, teintes rouges) pour maintenir l'ambiance.
*   **Placeholders**: Images génériques sombres ou symboles rituels.

---

## ⚛️ Composants et Interactions

### 1. Boutons

*   **Styles**: Primaire (action principale), Secondaire (action secondaire), Danger (suppression).
*   **États**: Normal, survol (hover), actif (active), désactivé (disabled), chargement (loading).
*   **Animations**: Légères transitions au survol, effets de pulsation pour les actions importantes.

### 2. Champs de Saisie (Inputs, Textareas)

*   **Styles**: Bordures subtiles, fond sombre, texte clair. Focus avec un halo rouge.
*   **Validation**: Indicateurs visuels pour les erreurs (bordure rouge, message d'erreur).

### 3. Cartes et Conteneurs

*   **Styles**: Fonds sombres, bordures subtiles, ombres portées pour la profondeur.
*   **Interactions**: Effets de survol (légère élévation, halo lumineux) pour les éléments interactifs.

### 4. Animations et Transitions

*   **Micro-interactions**: Feedback visuel pour les clics, les chargements.
*   **Transitions de Page**: Douces, pour éviter les coupures brusques.
*   **Animations Thématiques**: Effets de sang, de fumée, de pulsation (comme déjà implémenté).

---

## 🔗 Cohérence avec l'Architecture Serveur

Le design system reflétera la structure du backend :

*   **Entités**: Chaque entité majeure (Sinner, Offrande, Cercle, Écho) aura des représentations UI cohérentes (cartes, listes, formulaires).
*   **États**: Les états de chargement, d'erreur, de succès côté client seront directement liés aux réponses du backend.
*   **Rôles**: Le design pourra s'adapter aux rôles des utilisateurs (Gardien, Voyageur, Témoin) si des interfaces spécifiques sont développées pour eux.

---

Ce Design System servira de guide pour toutes les implémentations futures, assurant une expérience utilisateur unifiée et immersive.
