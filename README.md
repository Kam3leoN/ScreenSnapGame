# ScreenSnapGame

Quiz rétro : identifiez le jeu vidéo à partir de sa capture d'écran.

## Stack

- **Frontend** : React 19, Vite 6, TypeScript, SCSS, [K3UI](https://github.com/Kam3leoN/ScreenSnapGame)
- **Backend** : Express (dev) + Vercel Serverless (prod)
- **Base de données** : MongoDB (Docker en local, Atlas en production)

## Prérequis

- Node.js 20+
- Docker Desktop (dev local)
- Fichiers K3UI dans `c:/wamp64/www/k3ui/dist` (copiés automatiquement via `npm run copy:k3ui`)

## Installation

```bash
npm install
cp .env.example .env
npm run docker:up
npm run seed
npm run dev
```

- Client : http://localhost:5173
- API : http://localhost:3001

## Assets manquants

Placez les captures dans `client/public/snaps/` (noms = champ `image` en base, ex. `sonic_the_hedgehog.png`).

Sons optionnels dans `client/public/sounds/` :

- `true.mp3`, `false.mp3`, `1up.mp3`, `kick.mp3`, `smb3-wm1.mp3`

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | API + client en parallèle |
| `npm run build` | Build production client |
| `npm run seed` | Import SQL → MongoDB |
| `npm run docker:up` | Démarre MongoDB |

## Déploiement Vercel

1. Créer un cluster **MongoDB Atlas** et récupérer `MONGODB_URI`
2. Lier le dépôt GitHub `ScreenSnapGame` à Vercel
3. Variables d'environnement :
   - `MONGODB_URI`
   - `GAME_TOKEN_SECRET` (chaîne aléatoire longue)
4. `vercel --prod` ou déploiement automatique sur push `main`

## Structure

```
client/     # Application React
api/        # Routes serverless Vercel
server/     # Express (dev)
shared/     # Règles de jeu partagées
scripts/    # Seed, copie K3UI
sql/        # Données source (legacy)
```

## Licence

Projet personnel — Kam3leoN / Screenzone heritage.
