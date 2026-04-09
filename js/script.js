async function getWeather() {
    const location = document.getElementById('locationInput').value;
    const apiKey = "d9f588f23e944e0bb6a182418260804";

    document.getElementById('errorMessage').innerHTML = "";


    if (!location) {
        alert("Please enter a location.");
        return;
    }

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById('errorMessage').innerHTML = `<p>${data.error.message}</p>`;
            return;
        } else {
            document.getElementById('locationName').innerHTML = 
            `<h2>${location}</h2>
            <p>${data.location.region}, ${data.location.country}</p>`;
        }

    } catch (error) {
        document.getElementById('errorMessage').innerHTML = "<p>Error fetching data</p>";
    }
}
