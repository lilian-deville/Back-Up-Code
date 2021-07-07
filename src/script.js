function displayCurrent() {
  console.log("Suprise");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  console.log(days);
  let now = new Date();
  let weekday = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getUTCMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formatDate = `${weekday}, ${hours}:${minutes}`;
  document.getElementById("currentDayTime").innerHTML = formatDate;
}

//
function getTemp(response) {
  console.log(response);
  let cityInputNew = document.querySelector("#inputLocation");
  let temperature = document.querySelector("#temperature");
  let city = response.data.name;
  cityInputNew.innerHTML = `${city}`;
  temperature.innerHTML = Math.round(response.data.main.temp);
}
function displayInputTemp(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#cityentry");
  let cityHeading = document.querySelector("#inputLocation");
  cityHeading.innerHTML = `${searchCity.value}`;

  let cityId = `${searchCity.value}`;
  let apiKey = "be9debd96f41247fd5df628d8a693a73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
}

let searchNow = document.querySelector("#searchForm");
searchNow.addEventListener("submit", displayInputTemp);

//

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

let inputLocation = document.querySelector("#cityentry");
inputLocation.addEventListener("submit", showPosition);
//up to here no console errors//

function displayFahrenheitTemperature(event) {
  console.log(event);
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

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}2x.png`
  );
  iconElement.setAttributeNS("alt", response.data.weather[0].description);

  let celsius = document.querySelector("#celsius-link");
  celsius.addEventListener("click", convertToCelsius);

  let celsiusTemperature = null;

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);
}

function search(city) {
  let apiKey = "be9debd96f41247fd5df628d8a693a73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=Sydney&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  search("New York");

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);
}
