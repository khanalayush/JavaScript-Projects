# Weather Dashboard

A responsive weather dashboard built with **vanilla JavaScript** and **Tailwind CSS** that shows real-time weather and a 4-day forecast for any city in the world.

## Preview

> Search any city or use your current location to instantly see temperature, humidity, wind speed, and a 4-day forecast.

## Features

-  Search weather by city name
-  Detect and use current location (Geolocation API)
-  Current weather — temperature, description, humidity, wind speed
-  4-day forecast with daily weather breakdown
-  Live weather icons from OpenWeatherMap
-  Fully responsive — mobile, tablet, and desktop layouts
-  Zero dependencies — pure HTML, CSS, and JavaScript

##  Built With

| Technology | Purpose |
|---|---|
| HTML5 | Markup structure |
| Tailwind CSS | Utility-first styling |
| JavaScript (Vanilla) | Logic, API calls, DOM manipulation |
| [OpenWeatherMap API](https://openweathermap.org/api) | Real-time weather & forecast data |
| Google Fonts | DM Sans + Syne typography |

## APIs Used

- **Geocoding API** — converts city name → coordinates
- **Current Weather API** (`/data/2.5/weather`) — today's weather
- **5-Day Forecast API** (`/data/2.5/forecast`) — next 4 days (sampled every 24h)

## Getting Started

### Prerequisites

- A free API key from [OpenWeatherMap](https://openweathermap.org/api)
- A modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khanalayush/JavaScript-Projects.git
   cd "JavaScript-Projects/Weather Forecast App"
   ```

2. **Add your API key**

   Open `script.js` and replace the key on line 4:
   ```js
   const api_key = "YOUR_API_KEY_HERE";
   ```

3. **Open the app**

   Open `index.html` directly in your browser — no build step needed!

> **Note:** Make sure `tailwind.css` is available at the relative path `/dist/tailwind.css` as referenced in the HTML.

##  Project Structure

```
Weather Forecast App/
├── index.html    # UI layout — header, search panel, forecast grid
└── script.js     # API calls, geolocation, and DOM rendering
```

## How It Works

1. **Search by city** — Enter a city name and click Search. The app geocodes the name to coordinates, then fetches current weather and forecast data.
2. **Use current location** — Click "Use Current Location" to trigger the browser's Geolocation API and fetch weather for your exact coordinates.
3. **Today's weather** renders in the top panel with city name, temperature, description, humidity, and wind speed.
4. **4-Day Forecast** renders below, sampling one entry per day from the 5-day/3-hour forecast endpoint.

## Author

**Ayush Khanal**
| GitHub: [@khanalayush](https://github.com/khanalayush)