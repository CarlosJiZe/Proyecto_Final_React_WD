import React, { useState, useEffect } from 'react';
import './API.css';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
  
    const API_KEY = process.env.REACT_APP_API_WEATHER_KEY; // Tu clave API
  
    const search = async (city) => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error('Error fetching weather data');
        }
  
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    useEffect(() => {
      search("Ajijic");  // Probar con un nombre más específico o cerca de la ubicación del Lago de Chapala
    }, []);
  
    return (
      <div className="weather-container">
        {error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : weatherData ? (
          <div className="weather-info">
            <p className="temperature">{weatherData.main.temp}°C</p>
            {/* Mostrar el icono del clima */}
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
              className="weather-icon"
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };
  
  export default Weather;