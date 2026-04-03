// System Monitor — Script Automator Community Gallery
// Author: Antigravity Team
// License: MIT
//
// Displays device information: time, date, OS, and locale.

async function main() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" });

  let osInfo = "Unknown";
  let localeInfo = "Unknown";

  try {
    const osResult = await Device.getInfo("os");
    osInfo = JSON.parse(osResult).value || "Unknown";
  } catch (e) {
    console.warn("Could not get OS info: " + e);
  }

  try {
    const localeResult = await Device.getInfo("locale");
    localeInfo = JSON.parse(localeResult).value || "Unknown";
  } catch (e) {
    console.warn("Could not get locale: " + e);
  }

  const widget = {
    type: "container",
    modifiers: {
      background: "#1E1E2E",
      cornerRadius: 20,
      padding: { runtimeType: "all", value: 16 }
    },
    children: [
      {
        type: "row",
        modifiers: { alignment: "spaceBetween" },
        children: [
          {
            type: "text",
            content: "SYSTEM",
            modifiers: { color: "#6C7086", fontSize: 11, fontWeight: "bold" }
          },
          {
            type: "icon",
            content: "gear",
            modifiers: { fontSize: 14, color: "#6C7086" }
          }
        ]
      },
      { type: "spacer", modifiers: { height: 12 } },
      {
        type: "text",
        content: timeStr,
        modifiers: { color: "#CDD6F4", fontSize: 36, fontWeight: "bold" }
      },
      {
        type: "text",
        content: dateStr,
        modifiers: { color: "#A6ADC8", fontSize: 14 }
      },
      { type: "spacer", modifiers: { height: 16 } },
      {
        type: "row",
        children: [
          { type: "icon", content: "gear", modifiers: { fontSize: 14, color: "#89B4FA" } },
          { type: "spacer", modifiers: { width: 6 } },
          {
            type: "text",
            content: osInfo,
            modifiers: { color: "#89B4FA", fontSize: 12 }
          },
          { type: "spacer", modifiers: { width: 16 } },
          { type: "icon", content: "map.fill", modifiers: { fontSize: 14, color: "#A6E3A1" } },
          { type: "spacer", modifiers: { width: 6 } },
          {
            type: "text",
            content: localeInfo,
            modifiers: { color: "#A6E3A1", fontSize: 12 }
          }
        ]
      }
    ]
  };

  renderWidget(JSON.stringify(widget));
  console.log("System Monitor rendered");
}

main();
