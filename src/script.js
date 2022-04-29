//Adding time and date
let now = new Date();
function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute};`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let dayNumber = date.getDate();
  let year = date.getFullYear();

  let formattedDate = `${day} | ${month} ${dayNumber}, ${year} | ${hour}:${minute}`;
  return formattedDate;
}
let dayTime = document.querySelector("#day-time");
dayTime.innerHTML = formatDate(now);

//Changing weather details with city searched
function showTemperature(response) {
  document.querySelector("#city-header").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = temperature;

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `wind: ${wind} km/h`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
}
//Setting default city
function setDefaultCity(city) {
  let units = "metric";
  let apiKey = "89580641dc83acaa98e3dfb8c0563516";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
//Weather API
function searchCitySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  setDefaultCity(city);
}

//Geolocation API
function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "89580641dc83acaa98e3dfb8c0563516";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function updateCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCitySubmit);

//Current Location button
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationButton = document.querySelector("#your-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Default city
let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", searchCitySubmit);

setDefaultCity("San Francisco");

//Celsius to Fahrenheit conversion
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = (17 * 9) / 5 + 32;
  let tempElement = document.querySelector("#main-temperature");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
