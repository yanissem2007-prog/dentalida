# Backend & Dashboard — Dentalida

Login obligatoire · 1 admin (voit tout) + 2 managers · gestion des demandes de RDV.

## 1. Créer une base Postgres gratuite (Neon — 2 min)

1. Va sur **https://neon.tech** → Sign up (gratuit)
2. **Create project** → choisis la région la plus proche (Europe)
3. Copie la **Connection string** (format `postgresql://user:pass@...neon.tech/db?sslmode=require`)
4. Colle-la dans `.env.local` :
   ```
   DATABASE_URL=postgresql://...
   ```

> Alternative : Supabase (Project Settings → Database → Connection string / URI).

## 2. Initialiser la base (crée les tables + les comptes)

Relance le serveur (`npm run dev`) puis ouvre **une fois** dans le navigateur :

```
http://localhost:3000/api/seed?secret=<SEED_SECRET>
```

(le `SEED_SECRET` est dans `.env.local`). Tu dois voir `{"ok":true,"created":[...]}`.

## 3. Se connecter

Va sur **/login** et connecte-toi. Comptes créés (modifiables dans `.env.local` avant le seed) :

| Rôle | Email | Accès |
|------|-------|-------|
| Admin | `ADMIN_EMAIL` | Tout : demandes + équipe |
| Manager 1 | `MANAGER1_EMAIL` | Demandes |
| Manager 2 | `MANAGER2_EMAIL` | Demandes |

## 4. En production (Vercel)

Ajoute toutes les variables de `.env.local` dans **Settings → Environment Variables**, puis **Redeploy**.
Lance ensuite le seed une fois : `https://ton-domaine/api/seed?secret=...`

## Sécurité
- `/admin` et `/api/admin/*` protégés par middleware (JWT en cookie httpOnly).
- `/api/admin/users` réservé à l'admin.
- Change les mots de passe par défaut. Régénère `JWT_SECRET`/`SEED_SECRET` si partagés.
- Le seed est idempotent et protégé par secret (pas besoin de le supprimer).
