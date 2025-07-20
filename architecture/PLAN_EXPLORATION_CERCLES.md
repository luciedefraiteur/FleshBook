# Plan Exploration des Cercles pour FleshBook

## Objectif
Créer un système sacré d’exploration des Cercles inconnus et primordiaux, permettant aux Sinners de découvrir de nouveaux horizons rituels et de renforcer leurs connexions mystiques.

---

## Fonctionnalités

### 🔮 Découverte des Cercles

* **Algorithme de suggestion** :
  - Propose des Cercles où des Sinners des Cercles actuels de l’utilisateur sont également membres.
  - Priorise les Cercles actifs et récents.

* **Cercles Primordiaux** :
  - **Cercle de Lucifer** :
    - Admin : `luciedefraiteur@gmail.com`.
    - Règles spéciales : accès limité, contenu sacré.
  - Autres Cercles primordiaux :
    - Cercles universels accessibles à tous les Sinners.

---

## Endpoints

### 🔮 Découverte

* `GET /regard_abyssal`
  → Renvoie une liste de Cercles suggérés pour l’utilisateur.

* `GET /regard_abyssal/primordiaux`
  → Renvoie une liste des Cercles primordiaux.

---

## Tests et Résilience

* Tests automatisés pour l’algorithme de suggestion.
* Simulation de charges pour vérifier la fluidité des explorations.

---

**FleshBook :: Là où le regard abyssal révèle les mystères cachés.**
