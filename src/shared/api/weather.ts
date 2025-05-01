import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    lang: 'en',
  },
});

export const fetchWeatherByCity = async (
  city: string,
  units: 'metric' | 'imperial' = 'metric'
) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: {
        q: city,
        units,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const fetchWeatherDetails = async (
  city: string,
  units: 'metric' | 'imperial' = 'metric'
) => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        q: city,
        units,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number,
  units: 'metric' | 'imperial' = 'metric'
) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: {
        lat,
        lon,
        units,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};
