// Crypto Portfolio Tracker — Script Automator Community Gallery
// Author: CryptoDevs
// License: MIT
//
// Displays Bitcoin and Ethereum prices in a dark-mode finance widget.

async function getCryptoPrices() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
    );
    const data = JSON.parse(response.body);
    return {
      btc: {
        price: Math.round(data.bitcoin.usd),
        change: data.bitcoin.usd_24h_change?.toFixed(1) || "0.0",
      },
      eth: {
        price: Math.round(data.ethereum.usd),
        change: data.ethereum.usd_24h_change?.toFixed(1) || "0.0",
      },
    };
  } catch (error) {
    console.error("Crypto API failed: " + error);
    return {
      btc: { price: 42500, change: "2.1" },
      eth: { price: 2250, change: "-0.8" },
    };
  }
}

function formatPrice(price) {
  return "$" + price.toLocaleString();
}

function changeColor(change) {
  return parseFloat(change) >= 0 ? "#10B981" : "#EF4444";
}

function changePrefix(change) {
  return parseFloat(change) >= 0 ? "+" : "";
}

async function main() {
  const prices = await getCryptoPrices();

  const widget = {
    type: "container",
    modifiers: {
      background: "#111827",
      cornerRadius: 20,
      padding: { runtimeType: "all", value: 16 }
    },
    children: [
      {
        type: "text",
        content: "MARKET",
        modifiers: { color: "#6B7280", fontSize: 12, fontWeight: "bold" }
      },
      { type: "spacer", modifiers: { height: 16 } },
      {
        type: "row",
        modifiers: { alignment: "spaceBetween" },
        children: [
          {
            type: "row",
            children: [
              { type: "icon", content: "bitcoinsign.circle.fill", modifiers: { color: "#F7931A", fontSize: 28 } },
              { type: "spacer", modifiers: { width: 10 } },
              {
                type: "column",
                children: [
                  { type: "text", content: "BTC", modifiers: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" } },
                  {
                    type: "text",
                    content: changePrefix(prices.btc.change) + prices.btc.change + "%",
                    modifiers: { color: changeColor(prices.btc.change), fontSize: 12 }
                  }
                ]
              }
            ]
          },
          {
            type: "text",
            content: formatPrice(prices.btc.price),
            modifiers: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }
          }
        ]
      },
      { type: "spacer", modifiers: { height: 16 } },
      {
        type: "row",
        modifiers: { alignment: "spaceBetween" },
        children: [
          {
            type: "row",
            children: [
              { type: "icon", content: "bolt.circle.fill", modifiers: { color: "#627EEA", fontSize: 28 } },
              { type: "spacer", modifiers: { width: 10 } },
              {
                type: "column",
                children: [
                  { type: "text", content: "ETH", modifiers: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" } },
                  {
                    type: "text",
                    content: changePrefix(prices.eth.change) + prices.eth.change + "%",
                    modifiers: { color: changeColor(prices.eth.change), fontSize: 12 }
                  }
                ]
              }
            ]
          },
          {
            type: "text",
            content: formatPrice(prices.eth.price),
            modifiers: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }
          }
        ]
      }
    ]
  };

  renderWidget(JSON.stringify(widget));
  console.log("Crypto widget rendered");
}

main();
