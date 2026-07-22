# Graphify Skills — Clothing Store

_Learn Graphify on a real Express + React clothing store, in under an hour._

## Welcome

This repository is a full-stack clothing store (`ecommerce-backend` + `ecommerce-frontend`). This GitHub Skills-style exercise walks you through setting up **Graphify** so AI assistants (like Cursor) can understand how cart, orders, and payments connect.

- **Who is this for**: Developers new to Graphify or GitHub Skills exercises.
- **What you'll learn**: `.graphifyignore`, Graphify CLI, Cursor integration, and your first knowledge graph.
- **What you'll build**: Four concrete commits that Actions can verify.
- **Prerequisites**: A GitHub account; basic git (`add` / `commit` / `push`).
- **How long**: About 30–45 minutes.

In this exercise, you will:

1. Add a `.graphifyignore`
2. Install the Graphify CLI (and commit a proof file)
3. Connect Graphify to Cursor
4. Build and commit your first knowledge graph

### How progress works

After you copy the exercise, **Step 0** opens a single exercise Issue and posts Step 1 as a comment. Each time you finish a step (by pushing the required file to `main`), Actions checks your work and posts the **next** step as another comment on that same Issue. Follow the Issue comments — not only the README.

### How to start this exercise

Copy the exercise to your account, wait about **20 seconds** for Mona to prepare Step 1, then open the new Issue and follow the comments.

[![](https://img.shields.io/badge/Copy%20the%20exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/new?template_owner=vaishnavi-qb&template_name=clothing-store&owner=%40me&name=skills-graphify-clothing-store&description=Exercise:+Graphify+Skills+-+Clothing+Store&visibility=public)

<details>
<summary>Having trouble? 🤷</summary><br/>

When copying the exercise, we recommend:

- Owner: your personal account (or an org you can use)
- Visibility: **public** (private repos use Actions minutes)

If nothing happens after 20 seconds, check the **Actions** tab on your copied repo:

- A job may still be running
- If a job failed, open it for logs — or re-run `0-start-exercise.yml` via **workflow_dispatch**

Also confirm on the template repo:

1. **Settings → General → Template repository** is enabled
2. **Settings → Actions** allows Actions
3. Workflow permissions = **Read and write**

</details>

---

## About this codebase (optional)

| Area | Path |
|------|------|
| API entry | `ecommerce-backend/server.js` |
| Cart / orders / payments | `ecommerce-backend/routes/` + `controller/` |
| Storefront | `ecommerce-frontend/src/` |
| Swagger | `/api-docs` when the API is running |

```bash
npm install
npm start                          # API (nodemon)
cd ecommerce-frontend && npm run dev
```

---

&copy; 2026 &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)
