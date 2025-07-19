### **PLAN INITIAL POUR FLESHBOOK**

#### **1. Concept Général**

FleshBook est une plateforme sociale pour adultes, centrée sur les thèmes de la luxure et du blasphème. Loin des standards aseptisés des réseaux sociaux traditionnels, FleshBook offre un espace d'expression libre, artistique et provocateur. L'ambiance sera sombre, baroque, et l'expérience utilisateur immersive et ritualisée.

#### **2. Fonctionnalités Clés (Version Minimale Viable - MVP)**

Pour démarrer, nous nous concentrerons sur les fonctionnalités essentielles d'un réseau social, mais en les adaptant au thème :

*   **Profils des "Pécheurs" (Utilisateurs) :**
    *   Inscription / Connexion (peut-être avec un "pacte" à accepter).
    *   Page de profil personnalisable : photo, biographie ("Confession publique"), et des champs thématiques (ex: "Vice favori", "Premier blasphème").

*   **Les "Offrandes" (Publications) :**
    *   Création de publications : texte, images, et potentiellement des vidéos courtes.
    *   Le fil d'actualités, nommé "L'Abîme" ou "Le Purgatoire", où les offrandes des autres apparaissent.

*   **Les "Connexions Impies" (Relations Sociales) :**
    *   Système d'amis ou de "followers". On pourrait appeler l'action "Corrompre" ou "Enchaîner".
    *   Notifications pour les nouvelles connexions et interactions.

*   **Les "Sacrements" (Interactions) :**
    *   Commentaires sur les offrandes.
    *   Réactions thématiques (ex: un "Amen" ironique, une flamme, une goutte de sang) au lieu d'un simple "Like".

#### **3. Design & Ambiance Visuelle**

*   **Palette de couleurs :** Noir, rouge sang, or décadent, violet profond.
*   **Typographie :** Polices gothiques, baroques ou manuscrites pour les titres. Une police plus lisible pour le corps du texte.
*   **Iconographie :** Sigils, symboles alchimiques, anatomie baroque, vanités (crânes, sabliers), etc.
*   **Interface :** Un design qui évoque un grimoire ancien ou un autel secret.

#### **4. Stack Technique Proposée**

Pour un projet moderne et évolutif, je suggère la stack **MERN** :

*   **Frontend :** **React.js** (ou Next.js pour le rendu côté serveur) - Permet de créer une interface utilisateur dynamique et complexe.
*   **Backend :** **Node.js** avec le framework **Express.js** - Rapide, efficace et utilise JavaScript, ce qui simplifie le développement full-stack.
*   **Base de données :** **MongoDB** - Une base de données NoSQL flexible, parfaite pour stocker des données de profils et de publications qui peuvent évoluer.
*   **Authentification :** **JWT (JSON Web Tokens)** pour sécuriser les sessions utilisateur.

#### **5. Structure Initiale du Projet**

Je propose de créer une structure de dossiers simple pour commencer :

```
/fleshbook
|-- /client       # Contient l'application Frontend (React)
|-- /server       # Contient l'API Backend (Node.js/Express)
`-- PLAN_INITIAL.md # Ce fichier
```
