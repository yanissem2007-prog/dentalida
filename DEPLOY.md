# Mise en ligne — Dentalida (Vercel)

## Étape 1 — Le code est sur GitHub
Repo : `https://github.com/yanissem2007-prog/dentalida`
À chaque `git push`, Vercel redéploie automatiquement (une fois connecté).

## Étape 2 — Connecter Vercel
1. Va sur **https://vercel.com** → connecte-toi avec GitHub
2. **Add New → Project** → importe `dentalida`
3. Clique **Deploy** (le site public sera en ligne tout de suite)

## Étape 3 — Créer la base de données (prod)
Dans ton projet Vercel :
1. Onglet **Storage → Create Database → Postgres (Neon)** → Create
2. Vercel ajoute automatiquement `DATABASE_URL` aux variables d'environnement ✅

## Étape 4 — Ajouter les variables d'environnement
**Settings → Environment Variables** → ajoute (Production + Preview) :

```
NEXT_PUBLIC_SITE_URL = https://TON-DOMAINE        (ou l'URL .vercel.app)
RDV_TO_EMAIL         = ynzscgd9@gmail.com
RESEND_API_KEY       = <ta clé re_... depuis resend.com>
JWT_SECRET           = <génère: openssl rand -hex 32>
SEED_SECRET          = <génère: openssl rand -hex 16>
ADMIN_EMAIL          = ynzscgd9@gmail.com
ADMIN_PASSWORD       = <mot de passe admin solide>
MANAGER1_EMAIL       = manager1@dentalida.dz
MANAGER1_PASSWORD    = <mot de passe manager 1>
MANAGER2_EMAIL       = manager2@dentalida.dz
MANAGER2_PASSWORD    = <mot de passe manager 2>
```

> `DATABASE_URL` est déjà ajoutée par l'étape 3 — ne pas la remettre à la main.
> Les vraies valeurs (secrets, mots de passe) ne se mettent QUE dans Vercel et dans `.env.local` — jamais dans un fichier suivi par Git.

## Étape 5 — Redéployer + initialiser
1. **Deployments → … → Redeploy** (pour prendre les variables)
2. Ouvre **une fois** : `https://TON-DOMAINE/api/seed?secret=<TON_SEED_SECRET>`
   → crée les tables + les 3 comptes
3. Va sur `https://TON-DOMAINE/login` et connecte-toi 🎉

## Étape 6 — Domaine (optionnel)
**Settings → Domains** → ajoute ton domaine (ex: `dentalida.dz`) et suis les instructions DNS.
Pense à mettre à jour `NEXT_PUBLIC_SITE_URL` avec le domaine final.

---
### Notes
- Le **site public** marche même sans base. La **base** sert au dashboard + à l'enregistrement des demandes.
- Sans `RESEND_API_KEY`, le formulaire fonctionne quand même via **WhatsApp**.
- Sécurité : régénère `RESEND_API_KEY` (partagée en chat) et choisis des mots de passe forts.
