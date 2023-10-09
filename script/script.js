const inputContainer = document.getElementById("inputBox");
const placeName = document.getElementById("PlaceName");
const locationTemp = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const weatherImg = document.getElementById("weatherImage");
const weatherDescription = document.querySelector(".weather-description");

const currWidth = weatherImg.clientWidth;
weatherDescription.classList.add("hidden");
inputContainer.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && inputContainer.value !== "") {
    getData();
  }
});

async function getData() {
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${inputContainer.value}&aqi=no`
    ).then((res) => res.json());

    placeName.innerHTML = res.location.name;
    locationTemp.innerHTML = res.current.temp_c + "<sup>o</sup>";
    feelsLike.innerHTML = "Feels " + res.current.feelslike_f + "<sup>o</sup>";
    weatherImg.classList.add("weather-img");
    weatherDescription.classList.remove("hidden");
    locationTemp.classList.remove("error-font-size");
    weatherImg.classList.remove("error-img");

    if (res.current.temp_c >= 40) {
      weatherImg.src = "images/sunny.png";
    }
    else if (res.current.temp_c > 20) {
      weatherImg.src = "images/sun_behind.png";
    }
    else {
      weatherImg.src = "images/rain.png";
    }
    inputContainer.value = "";
  } catch {
    placeName.innerHTML = "";
    weatherImg.src = "images/cloud.png";
    locationTemp.innerHTML = "No Data Found";
    feelsLike.innerHTML = "";
    weatherDescription.classList.add("hidden");
    inputContainer.value = "";
    locationTemp.classList.add("error-font-size");
    weatherImg.classList.add("error-img");
  }
}