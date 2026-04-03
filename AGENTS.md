# AGENTS.md — AI Agent Instructions

> This file provides context and instructions for AI coding agents (GitHub Copilot, Cursor, Gemini, Claude, etc.) working with this repository.

---

## Repository Purpose

This is the **Script Automator Community Gallery** — a curated collection of JavaScript scripts that render as native iOS/Android home screen widgets via the SASUP (Script Automator Standard UI Protocol) rendering engine.

## Repository Structure

```
scripts/<category>/<script_id>/
├── metadata.json          # Script metadata (required)
├── <script_id>.js         # Main script file (required)
├── README.md              # Optional documentation
└── screenshots/           # Optional UI previews
index.json                 # Auto-generated master index (DO NOT EDIT)
```

## Architecture Context

### How Scripts Work

1. A JavaScript file is written by the user/community
2. The Script Automator app downloads and stores the script locally
3. The app runs the script in a **sandboxed JS engine** (QuickJS on Android, JavaScriptCore on iOS)
4. The script calls `renderWidget(JSON.stringify(uiTree))` to output a **SASUP JSON tree**
5. The JSON tree is saved to shared App Group storage
6. iOS WidgetKit / Android Glance reads the JSON and renders native UI components

### SASUP Protocol

SASUP is a JSON-based UI description language. Every widget tree has a `root` node:

```json
{
  "type": "container",
  "modifiers": {
    "background": "#1E293B",
    "cornerRadius": 20,
    "padding": { "runtimeType": "all", "value": 16 }
  },
  "children": [
    { "type": "text", "content": "Hello", "modifiers": { "color": "#FFF" } }
  ]
}
```

**Available types:** `container`, `column`, `row`, `stack`, `text`, `icon`, `image`, `button`, `spacer`

**Common modifiers:** `background`, `color`, `fontSize`, `fontWeight`, `cornerRadius`, `padding`, `width`, `height`, `alignment`, `flex`, `spacing`

### Available JS APIs

- `renderWidget(jsonString)` — Render UI tree
- `console.log/warn/error(msg)` — Console output
- `fetch(url, options)` — HTTP client (sandboxed, no localhost)
- `Device.getInfo(prop)` — Device info (`os`, `locale`, etc.)
- `Keychain.get/set/delete(key)` — Secure storage (namespaced)
- `Notification.send(title, body)` — Local notifications
- `readFile(path)` / `writeFile(path, content)` — Virtual file system

## Rules for AI Agents

### When Creating New Scripts

1. **Always create both** `metadata.json` and the `.js` file
2. **Always call** `renderWidget()` at the end of the script
3. **Use const** for the widget tree, never `var`
4. **Wrap fetch calls** in try/catch
5. **Use SF Symbol names** for icons (e.g., `cloud.sun.fill`, not `sunny`)
6. **Test all widget families** you claim to support in metadata
7. **Never access** localhost, 127.0.0.1, or private IPs in fetch calls
8. **Keep scripts under** 50 KB

### When Reviewing PRs

1. Validate `metadata.json` against the schema in README.md
2. Check that `id` is unique across all existing scripts
3. Verify `version` follows semver
4. Look for security red flags (localhost fetch, Keychain abuse, eval())
5. Ensure `renderWidget()` is called with valid SASUP JSON

### When Modifying index.json

**DO NOT** manually edit `index.json`. It is auto-generated from `scripts/*/metadata.json` files by CI.

### File Naming Conventions

- Script IDs: `lowercase_with_underscores` (e.g., `weather_pro_v2`)
- Categories: `lowercase` (e.g., `weather`, `finance`)
- Branches: `add/script-name`, `fix/script-name`, `update/script-name`

## Key Files Reference

| File | Purpose |
|------|---------|
| `README.md` | Main documentation, metadata schema |
| `CONTRIBUTING.md` | Contribution guidelines and code style |
| `index.json` | Auto-generated script index for the app |
| `scripts/*/metadata.json` | Individual script metadata |
| `.github/workflows/` | CI/CD pipelines (index generation, validation) |
