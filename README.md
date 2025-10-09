# MyContacts

**MyContacts** est une application web qui permet aux utilisateurs de gérer leurs contacts personnels.  
Chaque utilisateur peut créer un compte, se connecter et gérer sa liste de contacts (ajouter, modifier, supprimer et afficher les contacts).

---

## Fonctionnalités

### Gestion des utilisateurs
- Créer un compte  
- Se connecter  

### Gestion des contacts
- Ajouter un contact  
- Modifier un contact  
- Supprimer un contact  
- Afficher tous les contacts d’un utilisateur  

---

## Technologies utilisées

- **Backend** : **Node.js**, **Express.js** (API RESTful)
- **Frontend** : **React**
- **Base de données** : **MongoDB** (via Mongoose)
- **Tests** : **Jest** (`npm test`)

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/MuuvaY/MyContacts.git
cd frontend

```

## 2. Configuration et Lancement du Backend (`api/`)

### a. Installation des dépendances

```bash
cd backend
npm install

```
# Fichier : api/.env
- PORT=5000
- MONGO_URI="[VOTRE_URI_DE_CONNEXION_MONGODB]"
- JWT_SECRET="[VOTRE_CLE_SECRETE_POUR_JWT]"

### b. Démarrage du serveur

```bash
node index.js
# Le serveur démarrera sur http://localhost:5000
```

## 3. Configuration et Lancement du Frontend (frontend/)
### a. Installation des dépendances

Ouvrez un nouveau terminal et naviguez vers le dossier frontend :
```bash
cd ../frontend
npm install
```

### b. Démarrage de l’application
```bash
npm run vite
# L’application sera accessible via http://localhost:3000
````

### Tests

Les tests unitaires sont gérés par Jest.
Pour lancer les tests, exécutez la commande suivante dans le répertoire approprié (api/ et/ou frontend/) :
```bash
npm test
```
