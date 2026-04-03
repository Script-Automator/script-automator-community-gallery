// Countdown Timer — Script Automator Community Gallery
// Author: Antigravity Team
// License: MIT
//
// Configurable countdown widget for events, holidays, product launches.

const TARGET_DATE = "2026-12-31T00:00:00";
const EVENT_NAME = "New Year 2027";

function main() {
  const now = new Date();
  const target = new Date(TARGET_DATE);
  const diff = target - now;

  let days, hours, minutes;
  if (diff <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
  } else {
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  }

  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  const widget = {
    type: "container",
    modifiers: {
      background: "linear-gradient(135deg, #1a1a2e, #e94560)",
      cornerRadius: 24,
      padding: { runtimeType: "all", value: 20 }
    },
    children: [
      {
        type: "text",
        content: EVENT_NAME,
        modifiers: { color: "#FCA5A5", fontSize: 12, fontWeight: "bold" }
      },
      { type: "spacer", modifiers: { height: 12 } },
      {
        type: "row",
        modifiers: { alignment: "spaceBetween" },
        children: [
          {
            type: "column",
            children: [
              { type: "text", content: pad(days), modifiers: { color: "#FFFFFF", fontSize: 40, fontWeight: "bold" } },
              { type: "text", content: "days", modifiers: { color: "#FDA4AF", fontSize: 11 } }
            ]
          },
          { type: "text", content: ":", modifiers: { color: "#FFFFFF", fontSize: 36, fontWeight: "bold" } },
          {
            type: "column",
            children: [
              { type: "text", content: pad(hours), modifiers: { color: "#FFFFFF", fontSize: 40, fontWeight: "bold" } },
              { type: "text", content: "hours", modifiers: { color: "#FDA4AF", fontSize: 11 } }
            ]
          },
          { type: "text", content: ":", modifiers: { color: "#FFFFFF", fontSize: 36, fontWeight: "bold" } },
          {
            type: "column",
            children: [
              { type: "text", content: pad(minutes), modifiers: { color: "#FFFFFF", fontSize: 40, fontWeight: "bold" } },
              { type: "text", content: "mins", modifiers: { color: "#FDA4AF", fontSize: 11 } }
            ]
          }
        ]
      },
      { type: "spacer", modifiers: { height: 12 } },
      {
        type: "text",
        content: diff <= 0 ? "Event has passed!" : days + "d " + hours + "h " + minutes + "m remaining",
        modifiers: { color: "#FCA5A5", fontSize: 12 }
      }
    ]
  };

  renderWidget(JSON.stringify(widget));
}

main();
