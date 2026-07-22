## Step 4: Build your first knowledge graph

_Cursor is connected — almost done!_ :sparkles:

**What is a knowledge graph?**: Graphify reads your project and writes outputs like `graphify-out/GRAPH_REPORT.md` and `graph.json` so you (and AI) can query how the clothing store code connects — cart, orders, payments, and the React storefront.

### :keyboard: Activity: Run Graphify and commit output

1. From your project root:

```bash
graphify .
```

2. Confirm these exist:

- `graphify-out/GRAPH_REPORT.md`
- `graphify-out/graph.json` (optional but recommended)

3. Commit and push to `main`:

```bash
git add graphify-out/GRAPH_REPORT.md graphify-out/graph.json
git commit -m "Add first Graphify knowledge graph"
git push
```

4. Wait about 20 seconds — you should get a celebration comment when the course finishes.

<details>
<summary>Having trouble? 🤷</summary><br/>

- Run from the repo root (where `package.json` is).
- Open `graphify-out/graph.html` in a browser to explore the graph.

</details>
