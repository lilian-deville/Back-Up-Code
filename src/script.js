//Feature #1 display the current date and time using JavaScript: Tuesday 16:00

function displayCurrentDay() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getUTCMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#currentDayTime");
let currentTime = new Date();
dateElement.innerHTML = displayCurrentDay(currentTime);

function handle(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityentry");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
}
let search = document.querySelector("form");
search.addEventListener("submit", handle);

function getTemp(response) {
  console.log(response);
  let cityInputNew = document.querySelector("#currentLocation");
  let city = response.data.name;
  cityInputNew.innerHTML = `${city}`;
  let temperature = document.querySelector(".currenttemp");
  temperature.innerHTML = Math.round(response.data.main.temp);
}

//Feature #2 Add a search engine, when searching for a city (i.e. Paris), //
//display the city name on the page after the user submits the form.//

//get from week 7//

//Week 5: when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.//

function displayInputTemp(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#cityentry");
  let cityHeading = document.querySelector("#currentLocation");
  cityHeading.innerHTML = `${searchCity.value}`;

  let cityId = `${searchCity.value}`;
  let apiKey = "bddc5a8545983fb2fb2516d2150a111f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
}
let searchNow = document.querySelector("#searchForm");
searchNow.addEventListener("submit", displayInputTemp);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bddc5a8545983fb2fb2516d2150a111f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
}

function showPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let location = document.querySelector("#current-location");
location.addEventListener("subm", showPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(FahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement = Math.round(celsiusTemperature);
}

//new code to sort//

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySlectory("#currentLocation);
  let descriptionElement = document.querySlectory("#description");
  let humidityElement = document.querySlectory("#humidity");
  let windElement = document.querySlectory("#wind");
  let dateElement = document.querySlectory("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}2x.png`
  );
  iconElement.setAttributeNS("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "be9debd96f41247fd5df628d8a693a73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=Sydney&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.vale);
}
search("New York");

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
