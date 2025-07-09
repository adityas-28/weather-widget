const searchBtn = document.getElementById("search-btn");
const city = document.getElementById("city-name");
const weatherImage = document.getElementById("weather-img");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windIcon = document.getElementById("wind");
import API_KEY from "./config.js";

const weatherIcons = {
  sunny: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  cloudy: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  rainy: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
  snowy: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  thunder: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
  clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  night: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png",
};

function getWeatherType(description) {
  description = description.toLowerCase();
  if (description.includes("sun") || description.includes("clear"))
    return "sunny";
  if (description.includes("cloud")) return "cloudy";
  if (description.includes("rain") || description.includes("drizzle"))
    return "rainy";
  if (description.includes("snow")) return "snowy";
  if (description.includes("thunder")) return "thunder";
  if (description.includes("night")) return "night";
  return "clear";
}

searchBtn.addEventListener("click", async () => {
  const cityName = document.getElementById("city-input").value.trim();

  try {
    const weatherData = await fetchWeatherData(cityName);
    displayWeatherData(weatherData);
  } catch (error) {
    showError();
  }
});

async function fetchWeatherData(cityName) {
  // gets the data
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);
  //   console.log(response);
  //   console.log(typeof response);

  if (!response.ok) {
    throw new Error("City not found!");
  }

  const data = await response.json();
  return data;
}

function displayWeatherData(data) {
  // display weather data
  //   console.log(data);
  const { name, weather, main, wind } = data;

  city.innerHTML = name;
  temperature.innerHTML = `${main.temp}°C`;
  description.innerHTML = `${weather[0].description}`;
  humidity.innerHTML = `Humidity: ${main.humidity}%`;
  windIcon.innerHTML = `Wind: ${wind.speed} km/h`;

  const typeOfWeather = getWeatherType(weather[0].main);
  weatherImage.src = weatherIcons[typeOfWeather] || weatherIcons["clear"];
  weatherImage.style.display = "block";

  const widget = document.querySelector(".weather-widget");
  Object.keys(weatherIcons).forEach((type) => widget.classList.remove(type));
  widget.classList.add(typeOfWeather);
}

function showError() {
  console.error("something went wrong.");
  function showError() {
    city.innerHTML = "City not found";
    temperature.innerHTML = "-";
    description.innerHTML = "-";
    humidity.innerHTML = "-";
    windIcon.innerHTML = "-";
    weatherImage.style.display = "none";
  }
}
