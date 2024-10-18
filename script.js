const apiKey = '409648971ce5041028d2c8bf8c6ff647'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city-input').value.trim();

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    try {
        const weatherResponse = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        if (!weatherResponse.ok) {
            throw new Error('City not found');
        }
        const weatherData = await weatherResponse.json();
        updateWeather(weatherData);
        getForecast(city);
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('City not found. Please check the spelling or try another city.');
    }
}

async function getForecast(city) {
    try {
        const forecastResponse = await fetch(`/api/forecast?city=${encodeURIComponent(city)}`);
        const forecastData = await forecastResponse.json();
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = ''; // Clear previous forecast

        for (let i = 0; i < 5; i++) {
            const day = forecastData.list[i * 8]; // Get the forecast for each day

            const forecastElement = document.createElement('div');
            forecastElement.classList.add('forecast-day');

            // Dynamically insert the forecast details
            forecastElement.innerHTML = `
                <h3>${new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
                <p>${day.weather[0].description}</p>
                <p>Temp: ${day.main.temp}°C</p>
                <p>Humidity: ${day.main.humidity}%</p>
                <p>Wind: ${day.wind.speed} m/s</p>
            `;

            // Append each day's forecast to the grid
            forecastContainer.appendChild(forecastElement);
        }
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

function updateWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const weatherCondition = data.weather[0].main.toLowerCase();
    changeBackground(weatherCondition);
}

function changeBackground(condition) {
    document.body.classList.remove('sunny', 'rainy', 'snowy', 'default');

    if (condition.includes('clear')) {
        document.body.classList.add('sunny');
    } else if (condition.includes('rain')) {
        document.body.classList.add('rainy');
    } else if (condition.includes('snow')) {
        document.body.classList.add('snowy');
    } else {
        document.body.classList.add('default');
    }
}

function updateWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const weatherCondition = data.weather[0].main.toLowerCase();
    changeBackground(weatherCondition);
}

function changeBackground(condition) {
    document.body.classList.remove('sunny', 'rainy', 'snowy', 'default');

    if (condition.includes('clear')) {
        document.body.classList.add('sunny');
    } else if (condition.includes('rain')) {
        document.body.classList.add('rainy');
    } else if (condition.includes('snow')) {
        document.body.classList.add('snowy');
    } else {
        document.body.classList.add('default');
    }
}

function getForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById('forecast');
            forecastContainer.innerHTML = ''; // Clear previous forecast

            for (let i = 0; i < 5; i++) {
                const day = data.list[i * 8]; // Get the forecast for each day

                const forecastElement = document.createElement('div');
                forecastElement.classList.add('forecast-day');

                // Dynamically insert the forecast details
                forecastElement.innerHTML = `
                    <h3>${new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
                    <p>${day.weather[0].description}</p>
                    <p>Temp: ${day.main.temp}°C</p>
                    <p>Humidity: ${day.main.humidity}%</p>
                    <p>Wind: ${day.wind.speed} m/s</p>
                `;

                // Append each day's forecast to the grid
                forecastContainer.appendChild(forecastElement);
            }
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
        });
}
