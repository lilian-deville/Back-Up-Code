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

//Feature #2 Add a search engine, when searching for a city (i.e. Paris), //
//display the city name on the page after the user submits the form.//
function handle(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityentry");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
}
let search = document.querySelector("form");
search.addEventListener("submit", handle);

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



