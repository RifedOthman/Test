# Mately Test - Gestionnaire de Tâches Collaboratif

## Introduction & Objectif du projet

Ce projet constitue un test technique  comprenant un backend API et une application mobile frontend. Il s'agit d'un prototype permettant de suivre en temps réel l'évolution de tâches .

### Contexte métier
L'objectif est de permettre à plusieurs utilisateurs de créer des tâches, tout en offrant aux clients dans une application mobile la possibilité de récupérer les nouvelles tâches en temps réel.

---

## Structure du projet

```
mately/
├── Backend/          # API REST + WebSocket (Node.js + Express + MongoDB)
└── Frontend/         # Application mobile (React Native + Expo)
```

---

## Démarrage rapide

### Prérequis

- **Node.js** : v20.x ou supérieur
- **npm** 
- **MongoDB** : v6.x ou supérieur (ou Docker)
- **Docker** 

### Installation complète

1. **Cloner le projet**
```bash
git clone https://github.com/RifedOthman/Test
cd mately
```

2. **Backend - Installation et lancement**

**Option A : Avec Docker (Recommandé)**
```bash
cd Backend
docker-compose up -d --build
```

**Option B : Sans Docker**
```bash
cd Backend
npm install
# Créer un fichier .env avec :
# MONGO_URI=mongodb://localhost:27017/mately_test
# PORT=3000
npm run dev
```

3. **Frontend - Installation et lancement**
```bash
cd Frontend
npm install
# Configurer l'URL de l'API dans src/api/taskService.ts si nécessaire
npm start
```

---

### Architecture

Le projet est développé avec **React Native (Expo)** et **TypeScript** :

```
Frontend/src/
├── api/          # Configuration Axios et isolation des appels réseau
├── components/   # Composants UI réutilisables
├── hooks/        # Logique métier et cycle de vie
├── models/       # Interfaces TypeScript pour le typage des données
└── App.tsx       # Point d'entrée
```

### Choix technique : WebSocket vs Polling

L'application utilise **WebSocket** pour la synchronisation au lieu du polling.

**Considérations sur la scalabilité :**
Ayant pris conscience des enjeux de scalabilité, le WebSocket a été choisi en considérant le scaling de l'application. Le polling ne permet pas de gérer efficacement plusieurs clients simultanés : chaque client effectue des requêtes périodiques indépendamment, ce qui multiplie la charge serveur avec le nombre de clients. Le WebSocket, en revanche, permet une communication bidirectionnelle optimisée et une meilleure gestion des connexions simultanées pour une montée en charge.

**Avantages du WebSocket :**
- ✅ **Pas de requêtes inutiles** : Aucun fetch si aucune nouvelle tâche n'est créée
- ✅ **Meilleure performance** : Réduction de la charge serveur et de la consommation réseau
- ✅ **Scalabilité** : Meilleure gestion des connexions simultanées pour une montée en charge

**Note importante sur le polling :**
Pour implementer le polling, il suffit de modifier le hook `Frontend/src/hooks/useTasks.ts` pour remplacer la connexion WebSocket par un `setInterval` qui appelle `fetchTasksAPI` .


#### Endpoint 1 : Récupérer les tâches

**`GET /tasks?after=<date>`**

Récupère les tâches créées après une date donnée (maximum 20 résultats, triées par ordre chronologique).

**Query Parameters :**

| Paramètre | Type   | Requis | Description                        |               
|-----------|--------|--------|------------------------------------|
| `after`   | string | Oui    | Retourne les tâches créées après   |


#### Endpoint 2 : Simulateur de tâches

**`POST /simulate`**

Lance un processus qui crée automatiquement **10 tâches aléatoires**, espacées de **5 secondes** chacune.



