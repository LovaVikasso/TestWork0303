import { create } from 'zustand';
import { fetchWeatherByCity, fetchWeatherDetails } from '@/shared/api/weather';
import { Weather, WeatherForecastItem } from '@/entities/weather/types';

export type TemperatureUnit = 'C' | 'F';

export type CityWeather = {
  name: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
};

export type WeatherStore = {
  favoriteCities: CityWeather[];
  searchResults: CityWeather[];
  isLoading: boolean;
  searchCity: string;
  currentCity: string;
  temperatureUnit: TemperatureUnit;
  temperatureOptions: { value: TemperatureUnit; label: string }[];
  currentWeather: Weather | null;
  forecast: WeatherForecastItem[];
  error: string | null;
  searchFormError: string | null;
  addFavorite: (city: CityWeather) => void;
  removeFavorite: (cityName: string) => void;
  setSearchResults: (results: CityWeather[]) => void;
  clearSearchResults: () => void;
  setLoading: (loading: boolean) => void;
  isFavorite: (cityName: string) => boolean;
  setSearchCity: (city: string) => void;
  setCurrentCity: (city: string) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  searchWeather: (city: string) => Promise<void>;
  fetchCityWeather: (city: string) => Promise<void>;
  setError: (error: string | null) => void;
  setSearchFormError: (error: string | null) => void;
  updateFavoriteWeather: (city: string) => Promise<void>;
};

const defaultCities: CityWeather[] = [
  {
    name: 'Madagascar',
    country: 'MG',
    temperature: 25,
    description: 'Sunny',
    icon: '',
  },
  {
    name: 'Moscow',
    country: 'RU',
    temperature: 20,
    description: 'Cloudy',
    icon: '',
  },
  {
    name: 'London',
    country: 'GB',
    temperature: 15,
    description: 'Rainy',
    icon: '',
  },
];

const getUnits = (unit: TemperatureUnit) =>
  unit === 'C' ? 'metric' : 'imperial';

const STORAGE_KEY = 'favorite_cities';

const loadFavorites = (): CityWeather[] => {
  if (typeof window === 'undefined') return defaultCities;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : defaultCities;
};

const saveFavorites = (favorites: CityWeather[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  favoriteCities: loadFavorites(),
  searchResults: [],
  isLoading: false,
  searchCity: '',
  currentCity: loadFavorites()[0]?.name || 'Madagascar',
  temperatureUnit: 'C',
  temperatureOptions: [
    { value: 'C', label: '°C (Celsius)' },
    { value: 'F', label: '°F (Fahrenheit)' },
  ],
  currentWeather: null,
  forecast: [],
  error: null,
  searchFormError: null,
  addFavorite: (city) => {
    const exists = get().favoriteCities.some((c) => c.name === city.name);
    if (!exists) {
      if (get().favoriteCities.length >= 5) {
        set({ error: 'You can only have 5 favorite cities' });
        return;
      }
      const newFavorites = [...get().favoriteCities, city];
      set({ favoriteCities: newFavorites });
      saveFavorites(newFavorites);
    }
  },
  removeFavorite: (cityName) => {
    const newFavorites = get().favoriteCities.filter(
      (c) => c.name !== cityName
    );
    set({ favoriteCities: newFavorites });
    saveFavorites(newFavorites);
  },
  setSearchResults: (results) => set({ searchResults: results }),
  clearSearchResults: () => set({ searchResults: [] }),
  setLoading: (loading) => set({ isLoading: loading }),
  isFavorite: (cityName) =>
    get().favoriteCities.some((city) => city.name === cityName),
  setSearchCity: (city) => set({ searchCity: city }),
  setCurrentCity: (city) => set({ currentCity: city }),
  setTemperatureUnit: (unit) => {
    set({ temperatureUnit: unit });
    // Если есть текущий город, перезагружаем данные
    const currentCity = get().currentWeather?.name;
    if (currentCity) {
      get().fetchCityWeather(currentCity);
    }
  },
  setError: (error) => set({ error }),
  setSearchFormError: (error) => set({ searchFormError: error }),
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
        icon: data.weather[0].icon,
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

      // Обновляем данные в избранных городах, если город там есть
      set((state) => {
        const updatedFavorites = state.favoriteCities.map((favorite) => {
          if (favorite.name === city) {
            return {
              ...favorite,
              temperature: weatherData.main.temp,
              description: weatherData.weather[0].description,
              icon: weatherData.weather[0].icon,
            };
          }
          return favorite;
        });

        return {
          currentWeather: weatherData,
          forecast: forecastData.list,
          favoriteCities: updatedFavorites,
        };
      });
    } catch (err) {
      console.error('Error fetching weather data:', err);
      set({ error: 'Failed to fetch weather data' });
    } finally {
      set({ isLoading: false });
    }
  },
  updateFavoriteWeather: async (city: string) => {
    try {
      const units = getUnits(get().temperatureUnit);
      const weatherData = await fetchWeatherByCity(city, units);

      set((state) => {
        const updatedFavorites = state.favoriteCities.map((favorite) => {
          if (favorite.name === city) {
            return {
              ...favorite,
              temperature: weatherData.main.temp,
              description: weatherData.weather[0].description,
              icon: weatherData.weather[0].icon,
            };
          }
          return favorite;
        });

        // Сохраняем обновленные данные в localStorage
        saveFavorites(updatedFavorites);

        return {
          favoriteCities: updatedFavorites,
        };
      });
    } catch (err) {
      console.error('Error updating favorite weather:', err);
      set({ error: 'Failed to update weather data' });
    }
  },
}));
