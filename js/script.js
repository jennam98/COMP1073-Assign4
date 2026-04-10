// Input and button elements - TH
const searchBtn = document.getElementById("searchBtn");
const errorMessage = document.getElementById("errorMessage");
// Main sections that will be shown/hidden 
const welcomeCard = document.getElementById("welcomeCard");
const locationSection = document.getElementById("locationSection");
const currentWeatherSection = document.getElementById("currentWeatherSection");
const insightSection = document.getElementById("insightSection");
const forecastSection = document.getElementById("forecastSection");
// Elements for location and condition info
const locationName = document.getElementById("locationName");
const localTime = document.getElementById("localTime");
const conditionIcon = document.getElementById("conditionIcon");
const conditionText = document.getElementById("conditionText");
// Elements for current weather details 
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const uv = document.getElementById("uv");
const pressure = document.getElementById("pressure");
// Elements for sun/daylight details 
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const chanceOfRain = document.getElementById("chanceOfRain");
const maxMin = document.getElementById("maxMin");
// Eleements for insight text, forecast cards and recent searches
const weatherInsight = document.getElementById("weatherInsight");
const weeklyForecast = document.getElementById("weeklyForecast");
const recentSearches = document.getElementById("recentSearches");






async function getWeather() {
    // Get the location from the input field -JM
    const locationInput = document.getElementById('locationInput').value;
    //API Key for WeatherAPI -JM
    const apiKey = "d9f588f23e944e0bb6a182418260804";

    // Clear previous error messages -JM
    document.getElementById('errorMessage').innerHTML = "";

    // Validate the input -JM
    if (!location) {
        alert("Please enter a location.");
        return;
    }
    // Fetch weather data from the API -JM
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
        const data = await response.json();
        // Check if the API returned an error -JM
        if (data.error) {
            document.getElementById('errorMessage').innerHTML = `<p>${data.error.message}</p>`;
            return;
        // Display the weather information -JM
        } else {
            document.getElementById('locationName').innerHTML = 
            `<h2>${location}</h2>
            <p>${data.location.region}, ${data.location.country}</p>
            <img src="${data.current.condition.icon}" alt="Weather Icon">`;
        }
        
    // Handle any errors during fetching -JM       
    } catch (error) {
        document.getElementById('errorMessage').innerHTML = "<p>Error fetching data</p>";
    }

    // show weather details like temperature and condition
    document.getElementById("todaysWeather").innerHTML = `
    <p>Temperature: ${data.current.temp_c} °C</p>
    <p>Condition: ${data.current.condition.text}</p>
    <p>Humidity: ${data.current.humidity}%</p>
    <p>Wind: ${data.current.wind_kph} kph</p>
    `;
    // change color background according to weather condition
    if (condition.includes("sun")) {
        document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
      } else if (condition.includes("rain")) {
        document.body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
      } else if (condition.includes("cloud")) {
        document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
      }
}
