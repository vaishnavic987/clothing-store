## Step 2: Install the Graphify CLI

_Nice work on `.graphifyignore`!_ :sparkles:

**What is the Graphify CLI?**: A command-line tool (`graphify`) you install once on your laptop. The package name on PyPI is `graphifyy`.

Because Actions runs on GitHub’s servers (not your laptop), you leave a **proof file** so we can check that you installed it.

### :keyboard: Activity: Install CLI + commit proof

1. In a terminal on your machine:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv tool install graphifyy
graphify --version
```

2. Create the proof file:

```bash
mkdir -p graphify-setup
graphify --version > graphify-setup/CLI_OK.md
```

3. Commit and push to `main`:

```bash
git add graphify-setup/CLI_OK.md
git commit -m "Prove Graphify CLI is installed"
git push
```

4. Wait about 20 seconds and watch the comments for Step 3.

<details>
<summary>Having trouble? 🤷</summary><br/>

- If `graphify: command not found`, open a new terminal or add `~/.local/bin` to your `PATH`.
- Alternative install: `pipx install graphifyy`
- `graphify-setup/CLI_OK.md` must not be empty.

</details>
