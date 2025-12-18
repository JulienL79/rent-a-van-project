# RentAVan : Documentation et Guides

## 1. Architecture du Projet et Environnement DevOps
Cette section présente le découpage de l'application et les technologies utilisées pour les différents environnements (Développement, Intégration, Production).


### 1.1. Arborescence du Projet (Structure)
La structure du projet est organisée autour de deux applications principales (backend et frontend) et de l'outillage DevOps/qualité (infrastructure, .husky).

```bash
.
├── .github/                     # Workflows CI/CD (GitHub Actions)
├── .husky/                      # Configuration des hooks Git
├── infrastructure/              # Fichiers de configuration de l'environnement (Docker, etc.)
│   ├── db/                      # Stockage et configuration BDD (ex: scripts d'init)
│   ├── nginx/                   # Configuration du reverse proxy (nginx.conf)
│   └── docker-compose.dev.yml   # Définition de l'environnement dev multi-conteneurs
│   └── docker-compose.prod.yml  # Définition de l'environnement prod multi-conteneurs
├── backend/                     # Application API (Node.js/Express)
│   ├── src/                     # Code source
│   │   ├── controllers/         # Logique de gestion des requêtes (C de MVC)
│   │   ├── models/              # Schémas de données et logique d'accès à la BDD (M de MVC)
│   │   └── routes/              # Définition des endpoints API
│   └── package.json
├── frontend/                    # Application Client (React)
│   ├── src/
│   │   ├── components/          # Composants UI (Architecture Atomique)
│   │   │   ├── atoms/           # Composants de base (boutons, titres, inputs)
│   │   │   ├── molecules/       # Groupes d'atoms (formulaires, barres de navigation)
│   │   │   └── organisms/       # Groupes de molécules (headers, footers, sections complètes)
│   │   ├── pages/               # Agencement des organismes (V de MVC implicite)
│   │   └── services/            # Logique d'appel à l'API
│   └── package.json
└── README.md
```

### 1.2. Stack Technique

| Composant | Technologie | Rôle |
| :--- | :--- | :--- |
| **Backend (API)** | **Node.js** (Express/NestJS) | Fournit les endpoints API REST. |
| **Frontend (Client)** | **React** (ou similaire) | Interface utilisateur. |
| **Base de Données** | **PostgreSQL** (ou MongoDB) | Stockage persistant des données. |
| **Cache/Broker** | **Redis** | **Mise en cache rapide** des données fréquemment consultées (sessions, tokens, résultats d'API). |
| **Conteneurisation** | **Docker** & **Docker Compose** | Empaqueter l'application et ses dépendances. |
| **CI/CD** | **GitHub Actions** (ou Gitlab CI) | Automatisation des tests et des déploiements. |

### 1.3. Architecture des Applications 

**Backend (Node.js)**

L'API utilise une architecture MVC (Modèle-Vue-Contrôleur) classique, adaptée à un backend sans vue rendue :

- Modèles (models/) : Gèrent l'interaction avec la base de données (PostgreSQL) et contiennent la logique métier.

- Contrôleurs (controllers/) : Reçoivent les requêtes, interagissent avec les Modèles et renvoient les réponses HTTP.

- Routes (routes/) : Définissent les chemins des URLs et les associent aux Contrôleurs correspondants.

**Frontend (React)**

L'application React est structurée selon l'Architecture Atomique.

- Atomes (atoms/) : Les briques fondamentales (ex: `<Button>`, `<Input>`).

- Molécules (molecules/) : Combinaisons d'atomes qui fonctionnent ensemble (ex: un formulaire de connexion complet).

- Organismes (organisms/) : Sections d'une interface, composées de molécules et d'atomes (ex: le Header de l'application).

- Pages (pages/) : Combinaisons d'organismes pour former l'écran final.

### 1.4. Détail de l'Environnement DevOps (Conteneurisation)
L'environnement de développement et de déploiement est entièrement conteneurisé grâce à Docker et Docker Compose, assurant la portabilité et l'isolation des services.

**Services Docker (Conteneurs)**

L'environnement local et de staging est composé des conteneurs principaux suivants, définis dans infrastructure/docker-compose.yml :

| Nom du Service | Technologie | Rôle |
| :--- | :--- | :--- |
| **backend** | Image **Node.js** | Exécute l'API. Point d'entrée des requêtes backend. |
| **db** | Image **PostgreSQL** | Base de données relationnelle. |
| **redis** | Image **Redis** | **Stockage en mémoire** pour le cache et les sessions. |
| **nginx** | Image **Nginx** | **Reverse Proxy** et serveur de fichiers statiques, sert également l'application React. |

**Rôle du Conteneur Nginx**

Le conteneur nginx (configuré via infrastructure/nginx/nginx.conf) joue un rôle crucial en production et en environnement de test :

| Fonction | Détail | Pourquoi Nginx ? |
| :--- | :--- | :--- |
| **Reverse Proxy** | Il agit comme un point d'entrée unique pour toutes les requêtes externes. | Il assure une **terminaison SSL/TLS** (si configuré) et **répartit la charge** vers les conteneurs internes. |
| **Routage** | Il dirige le trafic :<ul><li>Les requêtes vers l'API (`/api/*`) sont envoyées au conteneur `backend`.</li><li>Les requêtes vers le Frontend (`/`, `/home`, etc.) sont envoyées au conteneur `frontend`.</li></ul> | Il sépare l'infrastructure et expose uniquement ce qui est nécessaire. |
| **Serveur Statique** | En production, il sert directement les fichiers statiques (HTML/CSS/JS) du Frontend. | **Performance :** Nginx est beaucoup plus rapide et efficace que Node.js pour servir des fichiers statiques. |

L'utilisation de Nginx permet de sécuriser, optimiser les performances et simplifier la gestion des différents services par le réseau Docker.

## 2. Guide d'Installation et de Démarrage (Développement Local)
Ce guide fournit les étapes exactes pour cloner, configurer et lancer l'application en environnement de développement local.

### 2.1. Prérequis
Assurez-vous que les outils suivants sont installés sur votre machine avant de commencer :

| Outil | Version Minimale |
| :--- | :--- |
| **Git** | `2.x` |
| **Node.js** | `18.x` |
| **Docker** | `20.x` |
| **Docker Compose** | `2.x` |

### 2.2. Procédure d'Installation
Suivez ces étapes dans l'ordre pour préparer votre environnement :

**Étape 1 : Clonage du Projet**
Utilisez Git pour récupérer le code source :

```bash
# Clonez le dépôt (remplacez l'URL par la bonne adresse)
git clone https://github.com/JulienL79/rent-a-van-project.git
# Déplacez-vous dans le répertoire du projet
cd rent-a-van-project
```

**Étape 2 : Configuration de l'Environnement**
Créez le fichier de configuration locale en copiant l'exemple fourni :

```bash
# Crée les fichier .env.dev et .env.prod en copiant l'exemple
cp .env.example .env.dev
cp .env.example .env.prod
```

⚠️ **Important** : Ouvrez le fichier .env et ajustez les variables (clés API, ports, identifiants de base de données) si les valeurs par défaut ne conviennent pas à votre environnement.

**Étape 3 : Installation des Dépendances**
Installez tous les packages NPM nécessaires, en vous mettant à la raçine :

```bash
npm install
```

**Étape 4 : Initialisation des Hooks Git (Husky)**
Activez les outils de qualité de code (Husky, lint-staged, commitlint) qui sécuriseront vos commits :

```bash
# Exécute le script "prepare" qui installe les hooks Husky
npm run prepare
```

## 2.3. Démarrage de l'Application en local
Le projet utilise Docker Compose pour orchestrer les services (API Node.js et Base de Données PostgreSQL).

```bash
#    Ceci va construire les images Docker et démarrer les conteneurs.
npm run dev:up
```

Une fois le démarrage terminé (cela peut prendre quelques secondes), l'application est opérationnelle :

**API Backend** : Accessible sur http://localhost:[API_PORT] (ex: http://localhost:3000).

**Base de Données** : Accessible par le backend sur le réseau Docker.

Les commandes liées à la base de données **à réaliser dans le container backend de Docker** sont :

```bash
npm run generate # -> Générer les migrations drizzle (si vous modifiez les schémas)
npm run migrate # -> Migrer les fichiers migrations vers votre BDD
npm run db:seed # -> Alimenter la BDD avec des données fictives
npm run db:truncate # -> Vider les tables de la BDD
npm run db:drop # -> Supprimer toutes les tables de la BDD
```

Pour arrêter tous les services conteneurisés :

```bash
npm run dev:down
```

## 2.3. Démarrage de l'Application en production

**============================ A COMPLETER =====================================**

## 3. Environnement Git

### 3.1. Conventional Commits

Nous utilisons le standard **Conventional Commits** pour écrire les messages de commit :

```<type>(<optional scope>): <description>```

Types de commits recommandés

| Type | Quand l’utiliser |
| :--- | :--- |
| **feat** | Nouvelle fonctionnalité |
| **fix** | Correction de bug |
| **docs** | Documentation |
| **style** | Formatage ou style, sans changement fonctionnel |
| **refactor** | Refactorisation du code, sans bug ni nouvelle feature |
| **perf** | Amélioration des performances |
| **test** | Ajout ou modification de tests |

---

### 3.2. Mise en place des hooks Git

Ce projet utilise :

* **Husky** : pour déclencher des hooks Git automatiquement
* **lint-staged** : pour formater/linter les fichiers staged avant commit
* **commitlint** : pour vérifier que les messages de commit respectent le format Conventional Commits

### 3.3. Exemple de commit

```bash
git add .
git commit -m "feat(auth): add login feature"
git push origin dev
```

Le code est formaté via lint-staged

Le message de commit est validé via commitlint

### 3.4. Workflow Git (Branches)

Nous utilisons un workflow simple basé sur Git avec deux branches principales protégées :

| Branche | Rôle | Statut de protection |
| :--- | :--- | :--- |
| **main** | **Production** (Contient le code prêt à être déployé ou déjà en production). | Protégée. |
| **dev** | **Intégration** (Contient les dernières fonctionnalités stables, base de travail). | Protégée. |

### Schéma et règles de développement

Toutes les nouvelles fonctionnalités, corrections de bugs ou travaux se font sur une **branche éphémère** créée à partir de `dev`.

**Règles de nommage :** `<type>/<description-courte>` (ex: `feat/add-api-endpoint` ou `fix/login-bug`).

Une Pull Request (PR) vers `dev` est requise pour toute intégration.

```text
main (prod)
  ^
  | Merge via PR (après validation sur dev)
  |
dev (integration)
  ^  ^  ^
  |  |  |
  |  |  Branch éphémère (feat/...)
  |  Branch éphémère (fix/...)
  Branch éphémère (refactor/...)
```