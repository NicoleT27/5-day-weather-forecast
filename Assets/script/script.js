var inputBox = document.getElementById("day");
var todaysForecast = document.getElementById("todaysForecast");
var cityBtns = document.getElementById("randomCities");
var apiKey = "7e3cc4b2e42426350ec91e0f5579fa07";
var form = document.querySelector("form");
var userInput = document.getElementById("inputtedCity");

cityBtns.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn")) {
    console.log("Button clicked!");
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var input = userInput.value;
  console.log(input);
});

function getCurrentWeather() {
  var city = "Kissimmee";
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
