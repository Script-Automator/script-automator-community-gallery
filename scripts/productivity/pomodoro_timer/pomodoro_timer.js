// Pomodoro Focus Timer — Script Automator Community Gallery
// Author: Antigravity Team
// License: MIT
//
// Minimal pomodoro timer widget showing remaining work/break time.
// Supports: small, medium widget families.

function getTimerState() {
  const now = new Date();
  const minuteInCycle = now.getMinutes() % 30;

  if (minuteInCycle < 25) {
    return {
      mode: "FOCUS",
      remaining: 25 - minuteInCycle,
      color: "#EF4444",
      bgGradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
      progress: minuteInCycle / 25,
    };
  } else {
    return {
      mode: "BREAK",
      remaining: 30 - minuteInCycle,
      color: "#10B981",
      bgGradient: "linear-gradient(135deg, #0a2e1a, #1a3a2e)",
      progress: (minuteInCycle - 25) / 5,
    };
  }
}

function main() {
  const state = getTimerState();
  const progressBarWidth = Math.round(state.progress * 100);

  const widget = {
    type: "container",
    modifiers: {
      background: state.bgGradient,
      cornerRadius: 24,
      padding: { runtimeType: "all", value: 20 }
    },
    children: [
      {
        type: "row",
        modifiers: { alignment: "spaceBetween" },
        children: [
          {
            type: "text",
            content: state.mode,
            modifiers: { color: state.color, fontSize: 13, fontWeight: "bold" }
          },
          {
            type: "icon",
            content: state.mode === "FOCUS" ? "flame.fill" : "leaf.fill",
            modifiers: { fontSize: 18, color: state.color }
          }
        ]
      },
      { type: "spacer", modifiers: { height: 16 } },
      {
        type: "text",
        content: state.remaining + " min",
        modifiers: { color: "#FFFFFF", fontSize: 48, fontWeight: "bold" }
      },
      {
        type: "text",
        content: "remaining",
        modifiers: { color: "#6B7280", fontSize: 14 }
      },
      { type: "spacer", modifiers: { height: 16 } },
      {
        type: "container",
        modifiers: {
          background: "#374151",
          cornerRadius: 4,
          height: 6
        },
        children: [
          {
            type: "container",
            modifiers: {
              background: state.color,
              cornerRadius: 4,
              height: 6,
              width: progressBarWidth
            },
            children: []
          }
        ]
      }
    ]
  };

  renderWidget(JSON.stringify(widget));
  console.log("Pomodoro widget rendered: " + state.mode);
}

main();
