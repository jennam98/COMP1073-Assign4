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
function renderForecast(days) {
    // clean any previous forecast cards
    weeklyForecast.innerHTML = "";

    days.forEach(day => {
        const date = new Date(day.date + "T00:00:00");
        const weekday = date.toLocaleDateString("en-CA", { weekday: "long" });

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");

        // fill the card with forecast information
        forecastCard.innerHTML = `
            <h4>${weekday}</h4>
            <p>${day.date}</p>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            <p><strong>${day.day.condition.text}</strong></p>
            <p>High: ${day.day.maxtemp_c}°C</p>
            <p>Low: ${day.day.mintemp_c}°C</p>
            <p>Rain Chance: ${day.day.daily_chance_of_rain}%</p>    
        `;

        weeklyForecast.appendChild(forecastCard);
    });
}
// function to generate a helpful weather suggestion 
function generateInsight(current, todayForecast) {
    const condition = current.condition.text.toLowerCase();
    const temp = current.temp_c;
    const rainChance = todayForecast.day.daily_chance_of_rain;
    const uvLevel = current.uv;

    // different suggestions depending on the weather
    if (condition.includes("rain") || rainChance >= 60) {
        return "Looks like a rainy day. Bring an umbrella, wear waterproof shoes, and maybe plan an indoor activity.";
    }

    if (condition.includes("snow")) {
        return "Snow is expected. Dress warmly, drive carefully, and bundle up before heading out.";
    }

    if (temp >= 28) {
        return "It is quite hot outside. Wear light clothing, stay hydrated, and try to avoid too much direct sun.";
    }

    if (temp <= 5) {
        return "It is pretty cold today. A warm jacket, layers, and maybe a hot drink would be a good idea.";
    }

    if (uvLevel >= 6) {
        return "The UV index is high. Sunscreen and sunglasses would be smart, even if it does not feel extremely hot.";
    }

    if (condition.includes("cloud")) {
        return "Cloudy but manageable. Great weather for a walk, errands, or a casual day out.";
    }

    // default message if none of the conditions above match
    return "The weather looks comfortable today. A nice day to be outside and enjoy the forecast.";
}
// function to change the page theme deoending on the weather condition
function updateTheme(data) {
    const current = data.current;
    const condition = current.condition.text.toLowerCase();
    const isDay = current.is_day;

    // clear existing theme classes from the body
    document.body.className = "";

    // Add a theme class based on time of day and condition
    if (!isDay) {
        document.body.classList.add("night-theme");
    } else if (condition.includes("sunny") || condition.includes("clear")) {
        document.body.classList.add("sunny-theme");
    } else if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("thunder")) {
        document.body.classList.add("rainy-theme");
    } else if (condition.includes("cloud") || condition.includes("overcast") || condition.includes("mist")) {
        document.body.classList.add("cloudy-theme");
    } else {
        document.body.classList.add("default-theme");
    }
}
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

