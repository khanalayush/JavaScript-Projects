let city = document.getElementById("cityInput");
const searchBtn = document.querySelector("#searchBtn");
const currentLocation = document.getElementById("current_Location");
const api_key = "cccfa16f2d6e5e1728dbab8aaa5c8b5a";

searchBtn.addEventListener("click", searchCity);
currentLocation.addEventListener("click", getCurrentLocation);

async function searchCity() {
  let cityName = city.value.trim();
  city.value = "";
  if (cityName) {
    fetchWeatherByCity(cityName);
  }
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (err) => alert("Location access denied."),
    );
  }
}

async function fetchWeatherByCity(cityName) {
  let geocoding_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  try {
    const response = await fetch(geocoding_API_URL);
    const data = await response.json();

    if (data.length === 0) {
      alert(`No results found for ${cityName}`);
      return;
    }

    const { lat, lon } = data[0];
    fetchWeatherByCoords(lat, lon);
    fetchForecast(lat, lon);
  } catch {
    alert(`Failed to fetch coordinates of ${cityName}`);
  }
}

async function fetchWeatherByCoords(lat, lon) {
  let weather_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  try {
    const response = await fetch(weather_API_URL);
    const data = await response.json();
    today_Weather(data);
    fetchForecast(lat, lon);
  } catch {
    alert(`Failed to fetch weather for current location`);
  }
}

function today_Weather(data) {
  const todayForecast = document.getElementById("today");
  todayForecast.innerHTML = `
  <div class="flex justify-between items-center w-full">
    <div class="text-left text-sm">
      <h3 class="font-bold text-xl">${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
    </div>
    <div class="shrink-0">
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon" class="w-24 h-24 sm:w-36 sm:h-36 object-contain"/>
    </div>
  </div>
  `;
}

async function fetchForecast(lat, lon) {
  const forecast_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  try {
    const response = await fetch(forecast_API_URL);
    const data = await response.json();

    const forecastDivs = document.querySelectorAll(".forecast");
    forecastDivs.forEach((div) => (div.innerHTML = ""));

    // Get one forecast per day (every 24h ~ 8 intervals)
    for (let i = 0; i < 4; i++) {
      const item = data.list[i * 8];
      const date = new Date(item.dt_txt).toLocaleDateString();
      forecastDivs[i].innerHTML = `
      <div class="text-sm">
          <h4 class="font-semibold">${date}</h4>
          <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="Weather icon" />
          <p>Temperature: ${item.main.temp}°C</p>
          <p>${item.weather[0].description}</p>
          <p>Humidity: ${item.main.humidity}%</p>
          <p>Wind: ${item.wind.speed} m/s</p>
      </div>
    `;
    }
  } catch {
    alert("Failed to fetch forecast data");
  }
}
