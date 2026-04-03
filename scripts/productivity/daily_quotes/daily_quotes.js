// Daily Quotes Widget — Script Automator Community Gallery
// Author: Antigravity Team
// License: MIT
//
// Displays an inspirational quote that changes daily.
// Uses a deterministic hash of the date to select from a curated collection.

const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "The most powerful tool we have as developers is automation.", author: "Scott Hanselman" },
  { text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
];

function getDailyQuote() {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return QUOTES[dayOfYear % QUOTES.length];
}

function main() {
  const quote = getDailyQuote();
  const now = new Date();
  const dateStr = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const widget = {
    type: "container",
    modifiers: {
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
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
            content: dateStr,
            modifiers: { color: "#818CF8", fontSize: 11, fontWeight: "bold" }
          },
          {
            type: "icon",
            content: "quote.opening",
            modifiers: { fontSize: 16, color: "#818CF8" }
          }
        ]
      },
      { type: "spacer", modifiers: { height: 16 } },
      {
        type: "text",
        content: quote.text,
        modifiers: {
          color: "#E0E7FF",
          fontSize: 18,
          fontWeight: "bold"
        }
      },
      { type: "spacer", modifiers: { height: 12 } },
      {
        type: "text",
        content: "— " + quote.author,
        modifiers: { color: "#6366F1", fontSize: 13, fontWeight: "bold" }
      }
    ]
  };

  renderWidget(JSON.stringify(widget));
}

main();
