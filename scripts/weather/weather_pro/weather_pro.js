// Weather Pro v2 — Script Automator Community Gallery
// Author: Antigravity Team
// License: MIT
//
// Displays current weather with gradient background, temperature, and conditions.
// Supports: small, medium, large widget families.

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const DEFAULT_LAT = 37.7749;
const DEFAULT_LON = -122.4194;

async function getWeather() {
  try {
    const url = WEATHER_API +
      "?latitude=" + DEFAULT_LAT +
      "&longitude=" + DEFAULT_LON +
      "&current_weather=true" +
      "&temperature_unit=fahrenheit";

    const response = await fetch(url);
    const data = JSON.parse(response.body);

    if (data.current_weather) {
      return {
        temp: Math.round(data.current_weather.temperature),
        windSpeed: Math.round(data.current_weather.windspeed),
        code: data.current_weather.weathercode,
      };
    }
  } catch (error) {
    console.error("Weather fetch failed: " + error);
  }

  // Fallback data
  return { temp: 72, windSpeed: 8, code: 2 };
}

function getConditionText(code) {
  if (code <= 1) return "Clear Sky";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow Showers";
  return "Stormy";
}

function getGradient(code) {
  if (code <= 1) return "linear-gradient(135deg, #667eea, #764ba2)";
  if (code <= 3) return "linear-gradient(135deg, #4facfe, #00f2fe)";
  if (code <= 48) return "linear-gradient(135deg, #6a85b6, #bac8e0)";
  if (code <= 67) return "linear-gradient(135deg, #1e3c72, #2a5298)";
  if (code <= 77) return "linear-gradient(135deg, #e6dada, #274046)";
  return "linear-gradient(135deg, #0f0c29, #302b63)";
}

function getWeatherIcon(code) {
  if (code <= 1) return "sun.max.fill";
  if (code <= 3) return "cloud.sun.fill";
  if (code <= 48) return "cloud.fill";
  if (code <= 67) return "cloud.rain.fill";
  if (code <= 77) return "cloud.snow.fill";
  return "cloud.bolt.fill";
}

async function main() {
  const weather = await getWeather();
  const condition = getConditionText(weather.code);
  const gradient = getGradient(weather.code);
  const icon = getWeatherIcon(weather.code);

  const widget = {
    type: "container",
    modifiers: {
      background: gradient,
      cornerRadius: 24,
      padding: { runtimeType: "all", value: 20 }
    },
    children: [
      {
        type: "row",
        modifiers: { alignment: "spaceBetween" },
        children: [
          {
            type: "column",
            children: [
              {
                type: "text",
                content: "San Francisco",
                modifiers: { font: "title", color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }
              },
              {
                type: "text",
                content: condition,
                modifiers: { font: "body", color: "#E0E0FF", fontSize: 14 }
              }
            ]
          },
          {
            type: "icon",
            content: icon,
            modifiers: { fontSize: 48, color: "#FFD700" }
          }
        ]
      },
      { type: "spacer", modifiers: { height: 20 } },
      {
        type: "text",
        content: weather.temp + "°",
        modifiers: {
          font: "largeTitle",
          color: "#FFFFFF",
          fontSize: 56,
          fontWeight: "bold"
        }
      },
      { type: "spacer", modifiers: { height: 12 } },
      {
        type: "row",
        children: [
          { type: "icon", content: "drop.fill", modifiers: { fontSize: 16, color: "#A5F3FC" } },
          { type: "spacer", modifiers: { width: 4 } },
          { type: "text", content: "15%", modifiers: { color: "#A5F3FC", fontSize: 14 } },
          { type: "spacer", modifiers: { width: 16 } },
          { type: "icon", content: "wind", modifiers: { fontSize: 16, color: "#A5F3FC" } },
          { type: "spacer", modifiers: { width: 4 } },
          {
            type: "text",
            content: weather.windSpeed + " mph",
            modifiers: { color: "#A5F3FC", fontSize: 14 }
          }
        ]
      }
    ]
  };

  renderWidget(JSON.stringify(widget));
  console.log("Weather widget rendered successfully");
}

main();
