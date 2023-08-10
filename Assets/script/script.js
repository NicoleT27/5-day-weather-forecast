// variables are decalred for easy interpolation in code
var inputBox = document.getElementById("day");
var todaysForecast = document.getElementById("todaysForecast");
var cityBtns = document.getElementById("randomCities");
var apiKey = "7e3cc4b2e42426350ec91e0f5579fa07";
var form = document.querySelector("form");
var userInput = document.getElementById("inputtedCity");
var city = document.getElementById("city");
var temp = document.querySelectorAll(".temp");
var wind = document.querySelectorAll(".wind");
var humidity = document.querySelectorAll(".humidity");
var button = document.getElementById("cityBtn");
var icon = document.getElementById("icon");
var dayOfWeek = document.getElementById("week");
var currentDate = document.getElementById("currentDate");
// var day = document.querySelectorAll(".day");

var today = dayjs();

// The event listener will only be envoked when the element being clicked
// is identified as a button to avoid envoking a button by clicking elsewhere
// on page
cityBtns.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn")) {
    city.innerHTML = event.target.innerText;
    currentDate.innerHTML = today.format(" dddd MMMM D YYYY" + " " + "hh:mm a");
    getCurrentWeather(event.target.innerText);
    getDailyForecast(city.innerHTML);
  }
});

// The event listner is envoked when the search button is submitted,
// it will prevent premature submission,and take the user input
// value and store it inside of the city heading
form.addEventListener("submit", function (event) {
  event.preventDefault();
  var input = userInput.value;
  city.innerHTML = input;
  currentDate.innerHTML = today.format(" dddd MMMM D YYYY" + " " + "hh:mm a");
  getCurrentWeather(userInput.value);
  getDailyForecast(city.innerHTML);
});

// The function is fetching the weather api data via json to display current
// weather statistics
function getCurrentWeather(city) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      temp.innerHTML = Math.round(data.main.temp);
      wind.innerHTML = Math.round(data.wind.speed);
      humidity.innerHTML = Math.round(data.main.humidity);
      icon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
    });
}

function getDailyForecast(city) {
  var dailyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=6&appid=${apiKey}&units=imperial`;
  fetch(dailyForecastUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      for (var i = 0; i < data.list.length; i++) {
        var days = data.list[i];
        // console.log(Math.round(days.main.temp));
        //  temp.innerHTML = Math.round(days.main.temp);

          data.list.forEach(function () {
            var weeklyForecast = document.getElementById("weeklyForecast" + i);
            var eachDay = weeklyForecast.parentElement.getAttribute("id");
             console.log(eachDay);
          });
      }
    });
}