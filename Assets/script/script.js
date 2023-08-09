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
var dayOfWeek = document.getElementById("week");
var currentDate = document.getElementById("currentDate");
var today = dayjs();

// The event listener will only be envoked when the element being clicked
// is identified as a button to avoid envoking a button by clicking elsewhere
// on page
cityBtns.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn")) {
    city.innerHTML = event.target.innerText;
    currentDate.innerHTML = today.format(" dddd MMMM D YYYY" + " " + "hh:mm a");
    console.log(currentDate.innerHTML);
    getCurrentWeather(event.target.innerText);
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
  console.log(currentDate.innerHTML);
  getCurrentWeather(userInput.value);
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
