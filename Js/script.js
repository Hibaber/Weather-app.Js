window.addEventListener("load", () => {

  let temperatureValue = document.querySelector(".temperature-value");
  let temperatureDescription = document.querySelector(".temperature-description");
  let location = document.querySelector(".location");
  let animatedIcon = document.querySelector(".animated-icon");
  let windSpeed = document.querySelector(".wind-speed");

  //si el objeto existe, los servicios de geolocalización estarían disponibles
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;

      // caso de usar ubicación actual
      // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=428a185f48376960ae6f1468824b5cf9`

      // caso ciudad actual
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&lang=es&units=metric&appid=428a185f48376960ae6f1468824b5cf9`
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          let temp = Math.round(data.main.temp)
          temperatureValue.textContent = `${temp} Cº`

          let desc = data.weather[0].description
          // temperatureDescription.innerHTML = desc.toUpperCase()

          location.textContent = data.name.toUpperCase();
          windSpeed.textContent = `${data.wind.speed} m/s`
          console.log(data.weather[0].main)
          switch (data.weather[0].main) {
            case "Clear":
              animatedIcon.src = "./animated/day.svg"
              break;
            case "Clouds":
              animatedIcon.src = "./animated/cloudy-day-1.svg"
              break;
            case "Rain":
              animatedIcon.src = "./animated/rainy-1.svg"
              break;
            case "Snow":
              animatedIcon.src = "./animated/snowy-1.svg"
          }



        })
        .catch(err => {
          console.log(err)
        })
    })

  }
})