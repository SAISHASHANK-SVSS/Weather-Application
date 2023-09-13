const weather = {
  apiKey: "b8dc907847a0dd33399ed3f9d6f7b122",
  fetchWeather: function (location) {
    document.querySelector(".weather").classList.add("loading");

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => {
        console.error(error);
        alert("Error fetching weather data. Please try again.");
      });
  },
  fetchWeatherByGeolocation: function () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          weather.fetchWeatherByCoordinates(latitude, longitude);
        },
        function (error) {
          console.error("Error getting geolocation:", error);
          alert("Error getting geolocation. Please try searching manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  },
  fetchWeatherByCoordinates: function (latitude, longitude) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => {
        console.error(error);
        alert("Error fetching weather data. Please try again.");
      });
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
  },
};

function searchWeather() {
  const location = document.querySelector(".search-bar").value;
  if (location.trim() !== "") {
    weather.fetchWeather(location);
  }
}

window.onload = function () {
  const searchButton = document.querySelector("button");
  searchButton.addEventListener("click", searchWeather);
  weather.fetchWeatherByGeolocation();

  const backgroundImage = new Image();
  backgroundImage.src = 'https://source.unsplash.com/random/1600x900/?nature';
  backgroundImage.onload = function() {
    document.body.style.backgroundImage = 'url(' + backgroundImage.src + ')';
  };
};
