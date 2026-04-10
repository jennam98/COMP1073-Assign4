

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
if (data.current.condition.text.includes("Sunny")) {
    document.body.style.backgroundColor = "lightyellow";
  } else if (data.current.condition.text.includes("Rain")) {
    document.body.style.backgroundColor = "lightblue";
  } else {
    document.body.style.backgroundColor = "lightgray";
  }
}
