# Contributing to Script Automator Community Gallery

Thank you for your interest in contributing! This document outlines the process and guidelines for submitting scripts to the community gallery.

---

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How to Contribute](#-how-to-contribute)
- [Script Requirements](#-script-requirements)
- [Folder Structure](#-folder-structure)
- [metadata.json Specification](#-metadatajson-specification)
- [Code Style Guide](#-code-style-guide)
- [Pull Request Process](#-pull-request-process)
- [Review Criteria](#-review-criteria)

---

## 🤝 Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive in all interactions
- Write scripts that are safe and do not harm users' devices or data
- Never include malicious code, data exfiltration, or unauthorized network requests
- Respect intellectual property — only submit original work or properly licensed code
- Report security vulnerabilities responsibly via [security@scriptautomator.app](mailto:security@scriptautomator.app)

---

## 🚀 How to Contribute

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/gallery.git
cd gallery
```

### 2. Create a Feature Branch

```bash
git checkout -b add/my-awesome-script
```

Use the naming convention: `add/<script-name>`, `fix/<script-name>`, or `update/<script-name>`.

### 3. Add Your Script

Create a new folder under the appropriate category:

```
scripts/weather/my_weather_script/
├── metadata.json
├── my_weather_script.js
└── screenshots/         # Optional
    └── preview.png
```

### 4. Test Your Script

Before submitting:

1. Open **Script Automator** on your device
2. Go to **Script Store** → tap **☁️ Import**
3. Paste the raw GitHub URL of your `.js` file
4. Verify the script runs correctly and renders a proper widget
5. Test on both iOS and Android if possible

### 5. Submit a Pull Request

```bash
git add .
git commit -m "add: Weather Forecast Pro widget"
git push origin add/my-awesome-script
```

Then open a Pull Request against the `main` branch.

---

## ✅ Script Requirements

### Mandatory

- [ ] Script must call `renderWidget()` to produce visible output
- [ ] Script must not exceed **50 KB** in file size
- [ ] Script must complete execution within **10 seconds**
- [ ] Script must include a valid `metadata.json`
- [ ] Script must specify at least one `widgetFamily` in metadata
- [ ] Script must not make requests to `localhost`, `127.0.0.1`, or private IP ranges
- [ ] Script must not attempt to access `Keychain` keys outside its own namespace

### Recommended

- [ ] Include inline comments explaining key logic
- [ ] Handle API errors gracefully (try/catch around `fetch()`)
- [ ] Support both light and dark backgrounds where applicable
- [ ] Test on `small`, `medium`, and `large` widget families
- [ ] Include at least one screenshot in `screenshots/`

---

## 📂 Folder Structure

```
scripts/<category>/<script_id>/
├── metadata.json          # Required: Script metadata
├── <script_id>.js         # Required: Main script file
├── README.md              # Optional: Extended documentation
└── screenshots/           # Optional: UI previews
    ├── small.png
    ├── medium.png
    └── large.png
```

### Categories

| Category | Folder | Description |
|----------|--------|-------------|
| Weather | `scripts/weather/` | Weather data, forecasts, climate |
| Finance | `scripts/finance/` | Stocks, crypto, budgeting |
| Utilities | `scripts/utilities/` | System tools, device info, clocks |
| Productivity | `scripts/productivity/` | Tasks, timers, habits |
| AI | `scripts/ai/` | AI-powered scripts |
| Games | `scripts/games/` | Mini-games and fun widgets |

---

## 📝 metadata.json Specification

Every script **must** include a `metadata.json` file. See the [README](./README.md) for the full schema.

### Example

```json
{
  "id": "crypto_portfolio_tracker",
  "name": "Crypto Portfolio",
  "description": "Track your Bitcoin and Ethereum holdings with live prices and portfolio value.",
  "author": "CryptoDevs",
  "authorUrl": "https://github.com/cryptodevs",
  "version": "1.0.0",
  "category": "Finance",
  "icon": "bitcoinsign.circle.fill",
  "tags": ["crypto", "bitcoin", "ethereum", "portfolio"],
  "widgetFamilies": ["small", "medium"],
  "minAppVersion": "1.0.0",
  "license": "MIT",
  "screenshots": ["screenshots/small.png", "screenshots/medium.png"],
  "isFeatured": false,
  "createdAt": "2026-04-01T00:00:00Z",
  "updatedAt": "2026-04-01T00:00:00Z"
}
```

### Validation Rules

- `id`: Must be unique, lowercase, use underscores only. Max 64 characters.
- `name`: 3-50 characters.
- `description`: 10-280 characters.
- `version`: Must follow [Semantic Versioning](https://semver.org/) (e.g., `1.0.0`).
- `category`: Must be one of the predefined categories listed above.
- `icon`: Must be a valid [SF Symbol](https://developer.apple.com/sf-symbols/) name.
- `widgetFamilies`: Array containing at least one of: `small`, `medium`, `large`, `extraLarge`, `accessory`.

---

## 🎨 Code Style Guide

### JavaScript Standards

We follow a clean, readable coding style:

```javascript
// ✅ Good: Clear variable names, consistent formatting
const API_URL = "https://api.example.com/data";
const REFRESH_INTERVAL = 300; // seconds

async function fetchWeatherData(city) {
  try {
    const response = await fetch(API_URL + "?city=" + encodeURIComponent(city));
    const data = JSON.parse(response.body);
    return data;
  } catch (error) {
    console.error("Failed to fetch weather: " + error);
    return null;
  }
}
```

```javascript
// ❌ Bad: Single-letter variables, no error handling
var d = fetch(u);
var x = JSON.parse(d);
renderWidget(JSON.stringify(x));
```

### Formatting Rules

| Rule | Standard |
|------|----------|
| Indentation | 2 spaces |
| Quotes | Double quotes for strings |
| Semicolons | Required |
| Variable declarations | `const` preferred, `let` when needed, never `var` |
| Naming | `camelCase` for variables/functions, `UPPER_SNAKE` for constants |
| Comments | JSDoc-style for functions, inline `//` for logic |
| Max line length | 100 characters |

### SASUP Tree Style

```javascript
// ✅ Good: Readable, structured widget tree
const widget = {
  type: "container",
  modifiers: {
    background: "#1E293B",
    cornerRadius: 20,
    padding: { runtimeType: "all", value: 16 }
  },
  children: [
    {
      type: "text",
      content: "Dashboard",
      modifiers: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "bold"
      }
    }
  ]
};
```

---

## 🔄 Pull Request Process

### PR Title Format

```
add: <Script Name> - <Brief Description>
fix: <Script Name> - <What was fixed>
update: <Script Name> - <What changed>
```

Examples:
- `add: Weather Forecast Pro - Multi-day forecast with gradients`
- `fix: Crypto Tracker - Handle API rate limit errors`
- `update: System Monitor - Add battery level display`

### PR Description Template

```markdown
## Summary
Brief description of the script and what it does.

## Checklist
- [ ] `metadata.json` is valid and complete
- [ ] Script runs without errors in Script Automator
- [ ] Widget renders correctly on at least one family size
- [ ] No external requests to private/local networks
- [ ] Code follows the style guide
- [ ] Screenshots included (if applicable)

## Screenshots
<!-- Paste widget screenshots here -->

## Testing
- iOS version tested: 
- Android version tested: 
- App version tested: 
```

### What Happens After Submission

1. **Automated Checks** — CI validates `metadata.json` schema and script syntax
2. **Community Review** — At least one maintainer reviews the PR
3. **Security Scan** — Scripts are checked for malicious patterns
4. **Merge** — Once approved, the script is merged and `index.json` is auto-regenerated
5. **Live** — The script appears in the app's Gallery within minutes

---

## 🔍 Review Criteria

Maintainers evaluate PRs based on:

| Criteria | Weight | Description |
|----------|--------|-------------|
| **Functionality** | 30% | Does it work? Does it produce a usable widget? |
| **Code Quality** | 25% | Clean, readable, well-commented code |
| **Security** | 20% | No malicious or dangerous patterns |
| **UI Quality** | 15% | Visually appealing, follows design best practices |
| **Documentation** | 10% | metadata.json complete, README provided |

### Instant Rejection Criteria

Your PR will be **immediately rejected** if:

- ❌ Script contains obfuscated or minified code
- ❌ Script makes requests to private IP ranges or localhost
- ❌ Script attempts to read Keychain keys it doesn't own
- ❌ Script contains offensive, hateful, or NSFW content
- ❌ Script is a duplicate or trivially modified copy of an existing script
- ❌ `metadata.json` is missing or invalid

---

## 💬 Getting Help

- **Discord** — Join our community server (link in app)
- **GitHub Issues** — Report bugs or suggest features
- **Discussions** — Ask questions in [GitHub Discussions](https://github.com/script-automator-community/gallery/discussions)

---

Thank you for making Script Automator better for everyone! 🚀
