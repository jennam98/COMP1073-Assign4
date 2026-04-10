// Input and button elements - TH
const locationInput = document.getElementById("locationInput");
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

// wait for the page to load before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    // run the search when the button is clicked 
    searchBtn.addEventListener("click", getWeather);
    // also run the search when the user presses Enter inside the input
    locationInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            getWeather();
        }
    });
    // load any recent searches from localStorage
    loadRecentSearch();
});

async function getWeather() {
    // Get the location from the input field -JM
    const location = document.getElementById('locationInput').value;
    //API Key for WeatherAPI -JM
    const apiKey = "93283d31d0df4d12aca193116262003";

    // Clear previous error messages -JM
    document.getElementById('errorMessage').innerHTML = "";

    // Validate the input -JM
    if (!location) {
        alert("Please enter a location.");
        return;
    }
    // Fetch weather data from the API -JM
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=7&aqi=no&alerts=no`);
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
            
            saveRecentSearches(location); // Save the search to localStorage -JM
        }
        
    // Handle any errors during fetching -JM       
    } catch (error) {
        document.getElementById('errorMessage').innerHTML = "<p>Error fetching data</p>";
    }
}

// function to display the main weather data on the page
function displayWeather(data) {
    const current = data.current;
    const location = data.location;
    const forecastDays = data.forecast.forecastDays;

    // hide the welcome section and show the weather section
    welcomeCard.classList.add("hidden");
    locationSection.classList.remove("hidden");
    currentWeatherSection.classList.remove("hidden");
    insightSection.classList.remove("hidden");
    forecastSection.classList.remove("hidden");

    // display location name and local time
    locationName.textContent = `${location.name}, ${location.region}, ${location.country}`;
    localTime.textContent = `Local time: ${location.localtime}`;

    // display weather icon and condition text
    conditionIcon.src = `https:${current.condition.icon}`;
    conditionIcon.alt = current.condition.text;
    conditionText.textContent = current.condition.text;

    //display current weather values
    temperature.textContent = `${current.temp_c}°C`;
    feelsLike.textContent = `Feels like ${current.feelslike_c}°C`;
    humidity.textContent = `${current.humidity}%`;
    wind.textContent = `${current.wind_kph} kph`;
    uv.textContent = current.uv;
    pressure.textContent = `${current.pressure_mb} mb`;

    // display today's astronomy and forecast values
    sunrise.textContent = forecastDays[0].astro.sunrise;
    sunset.textContent = forecastDays[0].astro.sunset;
    chanceOfRain.textContent = `${forecastDays[0].day.daily_chance_of_rain}%`;
    maxMin.textContent = `${forecastDays[0].day.maxtemp_c}°C / ${forecastDays[0].day.mintemp_c}°C`;

    // generate a custom suggestion based on today's weather
    weatherInsight.textContent = generateInsight(current, forecastDays[0]);

    // Create the 7-day forecast cards
    renderForecast(forecastDays);
}

// function to create forecast cards for each returned day
function renderForecast(days) {}
// function to generate a helpful weather suggestion 
function generateInsight(current, todayForecast) {}
// function to change the page theme deoending on the weather condition
function updateTheme(data) {}
// function to hide all weather result section when there is an error
function hideWeatherSections() {}
// function to save the latest search into localStorage


// function to save the latest search into localStorage -JM
function saveRecentSearches(location) {

    let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];

    if(!searches.includes(location)) {
        searches.unshift(location); // Add new search to the beginning of the array
    }

    searches = searches.slice(0, 5); // Keep only the latest 5 searches

    localStorage.setItem("recentSearches", JSON.stringify(searches));

    loadRecentSearches(); // Update the recent searches display
}

//Function to load recent searches -JM
function loadRecentSearches() {
    // Get existing searches from localStorage or initialize an empty array -JM
    let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];

    recentSearches.innerHTML = ""; // Clear previous recent searches
    // Add the new location to the beginning of the array -JM
    searches.forEach(loc => {
        const searchItem = document.createElement("p");
        
        searchItem.textContent = loc;
        //Add event listener for each recent search 
        searchItem.addEventListener("click", () => {
            locationInput.value = loc;
            getWeather();
        });
        // Append the search item to the recent searches container -JM
        recentSearches.appendChild(searchItem);
    });
    
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

