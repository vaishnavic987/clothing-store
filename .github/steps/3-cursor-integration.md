## Step 3: Connect Graphify to Cursor

_Great — your CLI proof looks good!_ :sparkles:

**What is a Cursor rule?**: A project file that guides Cursor. Graphify can install `.cursor/rules/graphify.mdc` so the assistant prefers graph queries for this clothing-store repo.

### :keyboard: Activity: Install the Cursor rule

1. From your project root (where `package.json` and `ecommerce-backend/` live):

```bash
graphify cursor install --project
```

2. Confirm this file exists: `.cursor/rules/graphify.mdc`

3. Commit and push to `main`:

```bash
git add .cursor/rules/graphify.mdc
git commit -m "Add Graphify Cursor rule"
git push
```

4. Wait about 20 seconds and watch the comments for Step 4.

<details>
<summary>Having trouble? 🤷</summary><br/>

- Use `--project` so the rule is stored in the repository.
- Path must be exactly `.cursor/rules/graphify.mdc`.

</details>
