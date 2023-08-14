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

// dayjs is being used to get the current day, date and time to go along with their weather
var today = dayjs();
// we are delcaring a searchHistory variable to hold the information for local storage, Whether there is info already
// saved in local storage or if its empty which will then be a empty array
var searchHistory =
  JSON.parse(window.localStorage.getItem("searchHistory")) || [];

// The event listener will only be envoked when the element being clicked
// is identified as a button to avoid envoking a button by clicking elsewhere
// on page
cityBtns.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn")) {
    city.innerHTML = event.target.innerText;
    // Day.js is being envoked
    currentDate.innerHTML = today.format(" dddd MMMM D YYYY" + " " + "hh:mm a");
    // The next two lines will be envoking functions that will collect information that was fetched from the api
    getCurrentWeather(event.target.innerText);
    getDailyForecast(city.innerHTML);
    // Then we are going to be adding it to local storage by creating a new variable that is assigned the city the user chose
    // Then we will add to the end of the searchHistory(.push) the newSearch variable which holds the city the user chose
    // Laslty we will reset the local storage with the new information by setting the key to search-history and the value
    // is the stringed version of the array holding the new city chosen
    var newSearch = city.innerHTML;
    searchHistory.push(newSearch);
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
  }
});

// The event listner is envoked when the search button is submitted,
// it will prevent premature submission,and take the user input
// value and store it inside of the city heading
form.addEventListener("submit", function (event) {
  event.preventDefault();
  var input = userInput.value;
  city.innerHTML = input;
  // Day.js is being envoked
  currentDate.innerHTML = today.format(" dddd MMMM D YYYY" + " " + "hh:mm a");
  // The next two lines will be envoking functions that will collect information that was fetched from the api
  getCurrentWeather(userInput.value);
  getDailyForecast(city.innerHTML);
  // Then we are going to be adding it to local storage by creating a new variable that is assigned the city the user chose
  // Then we will add to the end of the searchHistory(.push) the newSearch variable which holds the city the user chose
  // Laslty we will reset the local storage with the new information by setting the key to search-history and the value
  // is the stringed version of the array holding the new city chosen
  var newSearch = city.innerHTML;
  searchHistory.push(newSearch);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
});

// The function is fetching the weather api data via json to display current
// weather statistics for temp, wind, humidity and icon
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
// The function is fetching a diffrent weather api data via json to display 5day forecast
// weather statistics for temp, wind, humidity and icon
function getDailyForecast(city) {
  var dailyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(dailyForecastUrl)
    .then((response) => response.json())
    .then((data) => {
      // we have a for loop so that it will iterate over the array and grab information for every 8th data set,
      // which would be 0,8,16,24 and 32 for all 5 days
      var index = 1;
      for (var i = 0; i < data.list.length; i += 8) {
        var days = data.list[i];

        // The weekly forecast is being specifically chosen per specific day with the index
        var weeklyForecast = document.getElementById("weeklyForecast" + index);

        // var eachDay = weeklyForecast.parentElement.getAttribute("id");

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
        // The index is envoked again so that after it runs the function and gathers it once it will do it all over again
        // for each of the days until it stops at 5
        index++;
      }
    });
}
