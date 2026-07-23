## Step 6: Wave 2 - Implement from Frozen Tests

Great. Your failing tests are now frozen from the previous commit.

Goal for this step:

- Implement the feature requested in ticket.md.
- Keep test files unchanged.
- Make the full frontend test suite pass.

### Activity

1. Open your AI coding agent and prompt it to follow AGENTS.md implement-from-tests instructions.

Example prompt you can use:

```
Follow AGENTS.md implement-from-tests instructions.
Read ticket.md and implement the feature.
Use the previous commit as the frozen test anchor.
Do not modify test files.
```

2. Run the full frontend test suite and confirm GREEN.

```bash
cd ecommerce-frontend
npx vitest run
```

3. Commit only implementation files and push.

```bash
git add ecommerce-frontend/src/pages/Cart.jsx ecommerce-frontend/src/store/cartSlice.js ecommerce-frontend/src/pages/Checkout.jsx
git commit -m "feat: implement cart selection for checkout"
git push
```

### Important constraints for this step

- Do not edit, rename, move, or delete test files.
- CI will fail if test files were altered in this commit.
- CI will fail unless all frontend tests pass.
