let now = new Date();

let dateTime = document.querySelector(".date-time");

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

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dateTime.innerHTML = `${day}, ${hours}:${minutes}`;

let form = document.querySelector(".searchbar");
form.addEventListener("submit", search);

function displayWeatherCondition(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );


function searchCity(city) {
  let apiKey = "2b9d73225ef9671dd10e582640edb6d6";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  let location = document.querySelector(".location");
  location.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let weatherDiv = document.querySelector(".temperature");
  weatherDiv.innerHTML = `${temperature}ºC`;
}

searchCity("Austin");

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "2b9d73225ef9671dd10e582640edb6d6";
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(`${locationUrl}&appid=${key}`).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector(".pinButton");
button.addEventListener("click", getCurrentPosition);
