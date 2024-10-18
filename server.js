const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your OpenWeatherMap API key
const apiKey = '409648971ce5041028d2c8bf8c6ff647';

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get current weather
app.get('/api/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        res.status(404).json({ error: 'City not found' });
    }
});

// Route to get weather forecast
app.get('/api/forecast', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
        res.status(404).json({ error: 'City not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
