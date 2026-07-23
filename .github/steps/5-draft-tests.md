## Step 5: Wave 2 - Draft Failing Tests with an AI Coding Agent

You are now starting Wave 2 of this exercise.

Goal for this step:

- Use GitHub Copilot, Claude Code, or Cursor with the rules in AGENTS.md.
- Read the requirement from ticket.md.
- Generate failing tests first.
- Commit only test-related changes.

### Activity

1. Open your AI coding agent and prompt it to follow AGENTS.md draft-tests instructions.

Example prompt you can use:

```
Follow AGENTS.md draft-tests instructions.
Read ticket.md and create failing tests for the cart checkbox selection feature.
Do not modify implementation files.
```

2. Run tests locally and confirm RED (the new tests fail).

```bash
cd ecommerce-frontend
npx vitest run src/pages/Cart.test.jsx
```

3. Commit and push test-only changes.

```bash
git add ecommerce-frontend/src/pages/Cart.test.jsx ecommerce-frontend/package.json ecommerce-frontend/package-lock.json ecommerce-frontend/vite.config.js ecommerce-frontend/src/test-setup.js
git commit -m "test: draft failing tests for cart selection [RED]"
git push
```

### Important constraints for this step

- The commit must contain test-related files only.
- Do not include implementation file changes in this commit.
- CI will run the new tests and expects them to fail in this step.

Wait for the issue comments to show Step 6.
