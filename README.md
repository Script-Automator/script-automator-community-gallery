<p align="center">
  <img src="https://img.shields.io/badge/Script%20Automator-Community%20Gallery-blueviolet?style=for-the-badge&logo=javascript&logoColor=white" alt="Script Automator Community Gallery" />
</p>

<p align="center">
  <a href="#-getting-started"><img src="https://img.shields.io/badge/📖_Docs-Get_Started-informational?style=flat-square" /></a>
  <a href="#-contributing"><img src="https://img.shields.io/badge/🤝_Contribute-Welcome-success?style=flat-square" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" /></a>
  <img src="https://img.shields.io/github/stars/script-automator-community/gallery?style=flat-square&color=gold" alt="Stars" />
</p>

# 🌟 Script Automator — Community Gallery

> The official open-source collection of community-contributed scripts and widgets for [Script Automator](https://github.com/script-automator-community/app). Browse, install, and share automation scripts that run as native iOS and Android home screen widgets.

---

## 📖 What is Script Automator?

**Script Automator** is a cross-platform mobile app that lets you write JavaScript scripts and deploy them as native home screen widgets on iOS (WidgetKit) and Android (Jetpack Glance). The app uses a custom rendering protocol called **SASUP** (Script Automator Standard UI Protocol) to translate JSON UI trees into native SwiftUI and Glance components.

This repository is the **Community Gallery** — a curated, versioned collection of scripts that can be browsed and installed directly from within the app.

---

## 🚀 Getting Started

### Installing Scripts from the Gallery

1. **Open Script Automator** on your device
2. Navigate to the **Script Store** tab (🏬)
3. Browse or search for scripts
4. Tap **Install** — the script is automatically saved to your library
5. Open the script in the **Editor** and tap **▶ Run** to deploy it as a widget

### Manual Installation (Advanced)

You can also install scripts by importing their raw URL:

1. Copy the raw URL of any `.js` file from this repo  
   Example: `https://raw.githubusercontent.com/script-automator-community/gallery/main/scripts/weather/weather_pro.js`
2. In the app, go to **Script Store** → tap the **☁️ Import** button
3. Paste the URL and tap **Import**

---

## 📂 Repository Structure

```
scripts/
├── weather/                    # Weather-related scripts
│   ├── metadata.json           # Script metadata (name, author, version, icon)
│   └── weather_pro.js          # The actual script
├── finance/                    # Financial tools & trackers
│   ├── metadata.json
│   └── crypto_tracker.js
├── utilities/                  # System tools, timers, device info
│   ├── metadata.json
│   └── system_monitor.js
├── productivity/               # Task managers, pomodoro, habits
├── ai/                         # AI-powered scripts
└── games/                      # Mini-games & fun widgets
index.json                      # Master index consumed by the app
CONTRIBUTING.md                 # How to contribute
AGENTS.md                       # AI Agent instructions
```

### `metadata.json` Schema

Each script folder contains a `metadata.json` that describes the script for the app's Gallery UI:

```json
{
  "id": "weather_pro_v2",
  "name": "Weather Pro",
  "description": "Beautiful weather widget with live gradients, temperature, humidity, and wind speed.",
  "author": "Antigravity Team",
  "authorUrl": "https://github.com/antigravity",
  "version": "2.0.1",
  "category": "Weather",
  "icon": "cloud.sun.fill",
  "tags": ["weather", "gradient", "live-data"],
  "widgetFamilies": ["small", "medium"],
  "minAppVersion": "1.0.0",
  "license": "MIT",
  "screenshots": [],
  "isFeatured": true,
  "createdAt": "2026-01-15T00:00:00Z",
  "updatedAt": "2026-04-01T00:00:00Z"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier (lowercase, underscores) |
| `name` | `string` | ✅ | Display name in the Gallery |
| `description` | `string` | ✅ | Short description (max 280 chars) |
| `author` | `string` | ✅ | Author name |
| `authorUrl` | `string` | ❌ | Link to author profile |
| `version` | `string` | ✅ | Semver version (e.g., `1.0.0`) |
| `category` | `string` | ✅ | One of: `Weather`, `Finance`, `Utilities`, `Productivity`, `AI`, `Games` |
| `icon` | `string` | ✅ | SF Symbol name (used on iOS) or Material icon identifier |
| `tags` | `string[]` | ❌ | Searchable tags |
| `widgetFamilies` | `string[]` | ✅ | Supported sizes: `small`, `medium`, `large`, `extraLarge`, `accessory` |
| `minAppVersion` | `string` | ❌ | Minimum app version required |
| `license` | `string` | ✅ | License identifier (e.g., `MIT`, `Apache-2.0`) |
| `screenshots` | `string[]` | ❌ | Relative paths to screenshot images |
| `isFeatured` | `boolean` | ❌ | Whether to showcase in "Editor's Choice" |
| `createdAt` | `string` | ✅ | ISO 8601 creation date |
| `updatedAt` | `string` | ✅ | ISO 8601 last update date |

### `index.json` (Master Index)

The app fetches this file to populate the Gallery. It is an array of metadata objects enriched with a `content` field containing the raw script code:

```json
[
  {
    "id": "weather_pro_v2",
    "name": "Weather Pro",
    "description": "...",
    "author": "Antigravity Team",
    "version": "2.0.1",
    "category": "Weather",
    "content": "// Weather Pro script source code..."
  }
]
```

> **Note:** `index.json` is auto-generated by a CI script. Do NOT edit it manually. Submit scripts via Pull Requests and the index will be rebuilt automatically.

---

## 🧑‍💻 Writing a Script

Scripts are written in JavaScript and use the SASUP rendering protocol. Here's a minimal example:

```javascript
// Minimal Widget Script
const widget = {
  type: "container",
  modifiers: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    cornerRadius: 20,
    padding: { runtimeType: "all", value: 16 }
  },
  children: [
    {
      type: "text",
      content: "Hello, World!",
      modifiers: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" }
    }
  ]
};

renderWidget(JSON.stringify(widget));
```

### Available APIs

| API | Description |
|-----|-------------|
| `renderWidget(jsonString)` | Render a SASUP UI tree to the home screen widget |
| `console.log(message)` | Print to the in-app console |
| `console.error(message)` | Print error to console |
| `fetch(url, options)` | HTTP requests (GET, POST, PUT, DELETE) |
| `Device.getInfo(property)` | Get device info: `os`, `osVersion`, `locale`, `model` |
| `Keychain.get(key)` | Read from secure storage |
| `Keychain.set(key, value)` | Write to secure storage |
| `Notification.send(title, body)` | Send a local notification |
| `readFile(path)` | Read from the virtual file system |
| `writeFile(path, content)` | Write to the virtual file system |

### SASUP Widget Types

| Type | Description |
|------|-------------|
| `container` / `column` | Vertical layout container |
| `row` | Horizontal layout container |
| `stack` | Overlay/Z-axis container |
| `text` | Text label |
| `icon` | SF Symbol / Material icon |
| `image` | Image (file:// path) |
| `button` | Interactive button (iOS 17+ / Android 14+) |
| `spacer` | Flexible or fixed spacing |

---

## 🤝 Contributing

We welcome contributions from everyone! Please read our [Contributing Guide](./CONTRIBUTING.md) for full details.

**Quick summary:**

1. Fork this repository
2. Create a branch: `git checkout -b add/my-cool-script`
3. Add your script under `scripts/<category>/`
4. Include a valid `metadata.json`
5. Test your script in the app (paste raw URL → Import)
6. Submit a Pull Request

---

## 📜 License

This repository is licensed under the [MIT License](./LICENSE). Individual scripts may have their own licenses specified in their `metadata.json`.

---

<p align="center">
  Built with ❤️ by the <a href="https://github.com/script-automator-community">Script Automator Community</a>
</p>