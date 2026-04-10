# SkyScope Weather Dashboard

SkyScope is a creative weather dashboard built with HTML, CSS, and JavaScript using the WeatherAPI service. This project allows users to search for a city and view current weather conditions, a 7-day forecast, and extra weather-based suggestions.

## Features

- Search for weather by city
- View current temperature and weather condition
- Display location name, region, country, and local time
- Show extra details such as:
  - Feels like temperature
  - Humidity
  - Wind speed
  - UV index
  - Air pressure
  - Sunrise and sunset
  - Chance of rain
  - Maximum and minimum daily temperatures
- 7-day forecast cards
- Dynamic page theme based on weather conditions
- Weather insight section with suggestions based on current conditions
- Recent searches saved with localStorage
- Error handling for invalid or empty searches

## Technologies Used

- HTML5
- CSS3
- JavaScript
- WeatherAPI

## API Used

This project uses WeatherAPI.

Documentation:
https://www.weatherapi.com/docs/

## Team members

- Jenna Moss
- Nicoll Ramirez
- Teresa Heredia


Jenna's Contributions:


Creating Initial HTML Structure: -JM

- Adding basic html tags
- Creating a search bar
- Adding div tags and naming id's to be referenced  is our js

JavaScript 

- consts for location and api key
- Created an function getWeather to handle API requests
- Retrieved user input for location 
- Validated input to ensure a location is entered 
- Used fetch() to get api data based on the user’s location and API key
- Parsed the response using response.json()
- Checked for API errors and displayed an error message if needed
- Cleared previous error messages on each new search
- Used innerHTML to show results
- Displayed location name, region, and country from the API data
- Added a weather icon using the API’s condition icon URL
- Used try/catch to handle errors in retreving data
- Stored recent searches in localStorage and limited to 5 entries
- Loaded and displayed recent searches on page load
- Allowed users to click recent searches to quickly re-run queries

Teresa's Contributions: 

- Designed the CSS layout and responsive styling
- Expanded the JavaScript to include 7-days forecast data
- Added current weather detal cards 
- Added the weather insight feature 
- Added dynamic page themes 
- Added recent searches using localStorage
- Oranized and refined the final project structure 