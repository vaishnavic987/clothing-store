## Step 1: Add a `.graphifyignore`

_Welcome to "Graphify Skills — Clothing Store"!_ :wave:

**What is Graphify?**: Graphify builds a knowledge graph of your project so AI coding assistants (like Cursor) understand your code better.

**What is `.graphifyignore`?**: Like `.gitignore`, it tells Graphify which folders to skip — for example `node_modules` and Vite/React `dist` build output.

### :keyboard: Activity: Create `.graphifyignore`

1. Open a new browser tab and go to your repository **Code** tab (or use your local clone).
2. Create a file named **`.graphifyignore`** in the repo root (same level as `package.json`).
3. Paste this content:

```gitignore
.git/
node_modules/
dist/
out/
build/
coverage/
.env
.env.*
*.log
*.zip
package-lock.json
ecommerce-frontend/dist/
ecommerce-backend/images/
```

4. Commit and push to `main`:

```bash
git add .graphifyignore
git commit -m "Add .graphifyignore for Graphify course"
git push
```

5. Now that your file is pushed, Mona should already be busy checking your work. Give her a moment and keep watch in the comments. You will see progress info and the next lesson.

<details>
<summary>Having trouble? 🤷</summary><br/>

- Make sure the file is named exactly `.graphifyignore` (leading dot).
- It must include `node_modules` and `dist`.
- Check the **Actions** tab if you do not get feedback.

</details>
