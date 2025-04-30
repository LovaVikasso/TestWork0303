import { create } from 'zustand';
import { fetchWeatherByCity, fetchWeatherDetails } from '@/shared/api/weather';
import { Weather, WeatherForecastItem } from '@/entities/weather/types';

export type TemperatureUnit = 'C' | 'F';

export type CityWeather = {
  name: string;
  country: string;
  temperature: number;
  description: string;
};

export type WeatherStore = {
  favoriteCities: CityWeather[];
  searchResults: CityWeather[];
  isLoading: boolean;
  searchCity: string;
  temperatureUnit: TemperatureUnit;
  temperatureOptions: { value: TemperatureUnit; label: string }[];
  currentWeather: Weather | null;
  forecast: WeatherForecastItem[];
  error: string | null;
  addFavorite: (city: CityWeather) => void;
  removeFavorite: (cityName: string) => void;
  setSearchResults: (results: CityWeather[]) => void;
  clearSearchResults: () => void;
  setLoading: (loading: boolean) => void;
  isFavorite: (cityName: string) => boolean;
  setSearchCity: (city: string) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  searchWeather: (city: string) => Promise<void>;
  fetchCityWeather: (city: string) => Promise<void>;
  setError: (error: string | null) => void;
};

const defaultCities: CityWeather[] = [
  {
    name: 'Москва',
    country: 'Россия',
    temperature: 20,
    description: 'Солнечно',
  },
  {
    name: 'Санкт-Петербург',
    country: 'Россия',
    temperature: 18,
    description: 'Облачно',
  },
  {
    name: 'Новосибирск',
    country: 'Россия',
    temperature: 15,
    description: 'Пасмурно',
  },
];

const getUnits = (unit: TemperatureUnit) =>
  unit === 'C' ? 'metric' : 'imperial';

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  favoriteCities: defaultCities,
  searchResults: [],
  isLoading: false,
  searchCity: '',
  temperatureUnit: 'C',
  temperatureOptions: [
    { value: 'C', label: '°C (Celsius)' },
    { value: 'F', label: '°F (Fahrenheit)' },
  ],
  currentWeather: null,
  forecast: [],
  error: null,
  addFavorite: (city) => {
    const exists = get().favoriteCities.some((c) => c.name === city.name);
    if (!exists) {
      set((state) => ({
        favoriteCities: [...state.favoriteCities, city],
      }));
    }
  },
  removeFavorite: (cityName) => {
    set((state) => ({
      favoriteCities: state.favoriteCities.filter((c) => c.name !== cityName),
    }));
  },
  setSearchResults: (results) => set({ searchResults: results }),
  clearSearchResults: () => set({ searchResults: [] }),
  setLoading: (loading) => set({ isLoading: loading }),
  isFavorite: (cityName) =>
    get().favoriteCities.some((city) => city.name === cityName),
  setSearchCity: (city) => set({ searchCity: city }),
  setTemperatureUnit: (unit) => {
    set({ temperatureUnit: unit });
    // Если есть текущий город, перезагружаем данные
    const currentCity = get().currentWeather?.name;
    if (currentCity) {
      get().fetchCityWeather(currentCity);
    }
  },
  setError: (error) => set({ error }),
  searchWeather: async (city) => {
    try {
      set({ isLoading: true });
      const units = getUnits(get().temperatureUnit);
      const data = await fetchWeatherByCity(city, units);
      const cityWeather: CityWeather = {
        name: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        description: data.weather[0].description,
      };
      set({ searchResults: [cityWeather] });
    } catch (error) {
      console.error('Error searching weather:', error);
      set({ searchResults: [] });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchCityWeather: async (city: string) => {
    try {
      set({ isLoading: true, error: null });
      const units = getUnits(get().temperatureUnit);
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city, units),
        fetchWeatherDetails(city, units),
      ]);
      set({ currentWeather: weatherData, forecast: forecastData.list });
    } catch (err) {
      console.error('Error fetching weather data:', err);
      set({ error: 'Failed to fetch weather data' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
