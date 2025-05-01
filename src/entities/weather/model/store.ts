import {create} from 'zustand';
import {fetchWeatherByCity, fetchWeatherDetails} from '@/shared/api/weather';
import {Weather, WeatherForecastItem} from '@/entities/weather/types';

export type TemperatureUnit = 'C' | 'F';

export type CityWeather = {
    name: string;
    country: string;
    temperature: number;
    description: string;
    icon: string;
};
type TemperatureOption = { value: TemperatureUnit; label: string }
const TEMPERATURE_OPTIONS: TemperatureOption[] = [
    {value: 'C', label: '°C (Celsius)'},
    {value: 'F', label: '°F (Fahrenheit)'},
];
const STORAGE_KEY = 'favorite_cities';
export type WeatherStore = {
    favoriteCities: CityWeather[];
    searchResults: CityWeather[];
    isLoading: boolean;
    searchCity: string;
    currentCity: string;
    temperatureUnit: TemperatureUnit;
    temperatureOptions: TemperatureOption[];
    currentWeather: Weather | null;
    forecast: WeatherForecastItem[];
    error: string | null;
    setError: (error: string | null) => void;
    setFavoriteCities: (cities: CityWeather[]) => void;
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
    fetchCityWeather: (city: string, withForecast?: boolean) => Promise<void>;
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


export const loadFavorites = (): CityWeather[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultCities;
};

const saveFavorites = (favorites: CityWeather[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const useWeatherStore = create<WeatherStore>((set, get) => ({
    favoriteCities: [],
    searchResults: [],
    isLoading: false,
    searchCity: '',
    currentCity: 'Madagascar',
    temperatureUnit: 'C' as TemperatureUnit,
    temperatureOptions: TEMPERATURE_OPTIONS,
    currentWeather: null,
    forecast: [],
    error: null,
    searchFormError: null,
    setFavoriteCities: (cities) => set({favoriteCities: cities}),
    addFavorite: (city) => {
        const exists = get().favoriteCities.some((c) => c.name === city.name);
        if (!exists) {
            if (get().favoriteCities.length >= 5) {
                set({error: 'You can only have 5 favorite cities'});
                return;
            }
            const newFavorites = [...get().favoriteCities, city];
            set({favoriteCities: newFavorites});
            saveFavorites(newFavorites);
        }
    },
    removeFavorite: (cityName) => {
        const newFavorites = get().favoriteCities.filter(
            (c) => c.name !== cityName
        );
        set({favoriteCities: newFavorites});
        saveFavorites(newFavorites);
    },
    setSearchResults: (results) => set({searchResults: results}),
    clearSearchResults: () => set({searchResults: []}),
    setLoading: (loading) => set({isLoading: loading}),
    isFavorite: (cityName) =>
        get().favoriteCities.some((city) => city.name === cityName),
    setSearchCity: (city) => set({searchCity: city}),
    setCurrentCity: (city) => set({currentCity: city}),
    setTemperatureUnit: (unit) => {
        set({temperatureUnit: unit});
        const currentCity = get().currentWeather?.name;
        if (currentCity) {
            get().fetchCityWeather(currentCity);
        }
    },
    setError: (error) => set({error}),
    searchWeather: async (city) => {
        try {
            set({isLoading: true});
            const units = getUnits(get().temperatureUnit);
            const data = await fetchWeatherByCity(city, units);
            const cityWeather: CityWeather = {
                name: data.name,
                country: data.sys.country,
                temperature: data.main.temp,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
            };
            set({searchResults: [cityWeather]});

        } catch (error) {
            console.error('Error searching weather:', error);
            set({searchResults: []});
        } finally {
            set({isLoading: false});
        }
    },
    fetchCityWeather: async (city: string, withForecast: boolean = true) => {
        if (get().isLoading) return;

        try {
            set({isLoading: true, error: null});
            const units = getUnits(get().temperatureUnit);

            const [weatherData, forecastData] = await Promise.all([
                fetchWeatherByCity(city, units),
                withForecast ? fetchWeatherDetails(city, units) : Promise.resolve(null)
            ]);

            set((state) => ({
                currentWeather: weatherData,
                forecast: forecastData?.list || [],
                favoriteCities: state.favoriteCities.map(favorite =>
                    favorite.name === city ? {
                        ...favorite,
                        temperature: weatherData.main.temp,
                        description: weatherData.weather[0].description,
                        icon: weatherData.weather[0].icon,
                    } : favorite
                ),
            }));

        } catch (err) {
            const isAxiosError = (error: unknown): error is { response: { status: number } } => {
                return typeof error === 'object' && error !== null && 'response' in error;
            };

            if (isAxiosError(err) && err.response.status === 404) {
                set({
                    error: 'Error in city name',
                    searchResults: []
                });
            } else if (err instanceof Error) {
                set({error: err.message});
            } else {
                set({error: 'Unknown error'});
            }
        } finally {
            set({isLoading: false});
        }
    }
}));
