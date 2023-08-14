// variables are decalred for easy interpolation in code
var inputBox = document.getElementById("day");
var todaysForecast = document.getElementById("todaysForecast");
var cityBtns = document.getElementById("randomCities");
var apiKey = "7e3cc4b2e42426350ec91e0f5579fa07";
var form = document.querySelector("form");
var userInput = document.getElementById("inputtedCity");
var city = document.getElementById("city");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var button = document.getElementById("cityBtn");
var icon = document.getElementById("icon");
var dailyIcon = document.getElementById("dailyIcon");
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
    var cityChosen = city.innerHTML;
    var location = this.getAttribute("id");
    localStorage.setItem(location, cityChosen);
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
  var cityChosen = city.innerHTML;
  var location = cityBtns.getAttribute("id");
  localStorage.setItem(location, cityChosen);
});

// The function is fetching the weather api data via json to display current
// weather statistics
function getCurrentWeather(city) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=1&appid=${apiKey}&units=imperial`;
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      mainTemp.innerHTML = Math.round(data.main.temp);
      mainWind.innerHTML = Math.round(data.wind.speed);
      mainHumidity.innerHTML = Math.round(data.main.humidity);
      icon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
    });
}

function getDailyForecast(city) {
  var dailyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(dailyForecastUrl)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.list[0])
      // console.log(data.list[8]);
      // console.log(data.list[16]);
      // console.log(data.list[24]);
      // console.log(data.list[32]);
      var index = 1;
      for (var i = 0; i < data.list.length; i += 8) {
        var days = data.list[i];
        console.log(days);

        var weeklyForecast = document.getElementById("weeklyForecast" + index);

        var eachDay = weeklyForecast.parentElement.getAttribute("id");

        var temp = weeklyForecast.querySelector("#temp");
        var wind = weeklyForecast.querySelector("#wind");
        var humidity = weeklyForecast.querySelector("#humidity");

        temp.innerHTML = Math.round(days.main.temp);
        wind.innerHTML = Math.round(days.wind.speed);
        humidity.innerHTML = Math.round(days.main.humidity);

        var dailyIcon = document.getElementById("dailyIcon" + index);
        dailyIcon.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${days.weather[0].icon}@2x.png`
        );
        index++;
      }
    });
}
