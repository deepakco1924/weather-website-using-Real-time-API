import { API_KEY, API_URL } from "./configuration.js";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
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
const weather = document.querySelector(".weather");
const inputbar = document.querySelector(".search-bar");
const btnseach = document.querySelector(".btnsearch");
const loadingremove = false;
const getJSON = async function (url) {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("city not found! please enter valid city");
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
const convertFahreneotToCelsius = (temp) => {
  const newtemp = temp - 273.16;
  return newtemp.toFixed(2);
};
const getmarkup = (data) => {
  const markup = `
  <h2 class="city">Weather in ${data.name}</h2>
        <h1 class="temp">${convertFahreneotToCelsius(data.main.temp)}°C</h1>
        <div class="flex">
          <img
            src="https://openweathermap.org/img/wn/04n.png"
            alt=""
            class="icon"
          />
          <div class="description">${data.weather[0].description}</div>
        </div>
        <div class="humidity">Humidity: ${data.main.humidity}%</div>
        <div class="wind">Wind speed: ${data.wind.speed} km/h</div>
  `;
  return markup;
};
const getdata = async function (city) {
  try {
    const data = await getJSON(`${API_URL}=${city}&appid=${API_KEY}`);
    const markup = getmarkup(data);
    weather.innerHTML = "";
    weather.insertAdjacentHTML("afterbegin", markup);
    weather.classList.remove("loading");
  } catch (err) {
    const markup = `
      <div class="error">
       <p> City not found!</p> please enter valid city name.
      </div>
    `;
    weather.innerHTML = "";
    weather.insertAdjacentHTML("afterbegin", markup);
    weather.classList.remove("loading");
  }
};
btnseach.addEventListener("click", function (e) {
  e.preventDefault();
  const city = inputbar.value;
  getdata(city);
});
