let searchBox = document.getElementById("cityinput");
let searchBtn = document.getElementById("searchbutton");

const weatherCheck = () => {
  let apiKey = "0781a15c5933a211443e3d9cd4572f75";
  let cityName = searchBox.value;
  if (cityName == null || cityName == undefined || cityName == "") {
    eraseData();
  } else {
    eraseData();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City Not Found");
        }
        return response.json();
      })
      .then((data) => {
        displayData(data);
      })
      .catch((error) => {
        console.log(error);
        eraseData();
        document.getElementById("icon").src = "/assets/error-905.png";
        document.getElementById("icon").width = "70";
        document.getElementById("msg").innerHTML = error.message;
      });
  }
};

const displayData = (data) => {
  let iconName = data.weather[0].icon;
  document.getElementById(
    "icon"
  ).src = `https://openweathermap.org/img/wn/${iconName}@2x.png`;
  document.getElementById("tempo").innerHTML =
    Math.round(data.main.temp - 273.15) + " °C";
  document.getElementById("desc").innerHTML = data.weather[0].description;
  document.getElementById("cityname").innerHTML = data.name;
  document.getElementById("humidity").innerHTML = data.main.humidity + "%";
  document.getElementById("humid").innerHTML = "Humidity";
  document.getElementById("windspeed").innerHTML = "Wind Speed";
  document.getElementById("wind").innerHTML = data.wind.speed + "Km/hr";
};

const eraseData = () => {
  document.getElementById("tempo").innerHTML = "";
  document.getElementById("desc").innerHTML = "";
  document.getElementById("cityname").innerHTML = "";
  document.getElementById("humidity").innerHTML = "";
  document.getElementById("wind").innerHTML = "";
  document.getElementById("icon").src = "";
  document.getElementById("humid").innerHTML = "";
  document.getElementById("windspeed").innerHTML = "";
  document.getElementById("msg").innerHTML = "";
};

searchBtn.addEventListener("click", weatherCheck);
