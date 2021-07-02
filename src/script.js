//Feature #1 display the current date and time using JavaScript: Tuesday 16:00

function displayCurrent() {
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
  let formatDate = `${day}, ${hours}:${minutes}`;
  document.getElementById("currentDayTime").innerHTML = formatDate;
}
displayCurrent();

//
//Bonus Feature: Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.
//When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.//

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 80;
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 21;
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToCelsius);

//Week 5: when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.//
function getTemp(response) {
  let cityInputNew = document.querySelector("#currentLocation");
  let city = response.data.name;
  cityInputNew.innerHTML = `${city.value}`;

  let temperature = document.querySelector(".currenttemp");
  temperature.innerHTML = Math.round(response.data.main.temp);
}
console.log(getTemp);

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
location.addEventListener("click", showPosition);

//Week 5 bonus:Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.//
