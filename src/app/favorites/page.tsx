'use client';

import { useEffect, useRef } from 'react';
import { loadFavorites, useWeatherStore } from '@/entities/weather/model/store';
import { PageHeader } from '@/shared/ui/PageHeader';
import { WeatherMiniCard } from '@/entities/weather/ui/WeatherMiniCard';
import { Spinner } from '@/shared/ui/Spinner';
import { Toast } from '@/shared/ui/Toaster';
import {Typography} from "@/shared/ui/Typography";

export default function FavoritesPage() {
  const {
    favoriteCities,
    temperatureUnit,
    isLoading,
    error,
    fetchCityWeather,
    setLoading,
    setError,
    setFavoriteCities,
    setCurrentCity,
  } = useWeatherStore();

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      const storedFavorites = loadFavorites();
      setFavoriteCities(storedFavorites);
      if (storedFavorites.length > 0) {
        setCurrentCity(storedFavorites[0].name);
      }
      isInitialMount.current = false;
    }

    const updateFavoritesWeather = async () => {
      try {
        await Promise.all(
          favoriteCities.map((city) => fetchCityWeather(city.name, false))
        );
      } catch (err) {
        setError('Failed to update weather data');
      } finally {
      }
    };

    if (favoriteCities.length > 0) {
      updateFavoritesWeather();
    }
  }, [
    favoriteCities.length,
    fetchCityWeather,
    setLoading,
    setError,
    setFavoriteCities,
    setCurrentCity,
    temperatureUnit
  ]);
  return (
    <div className="container mt-5">
      <PageHeader title="Favorites" />
      {error && <Toast message={error} />}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {favoriteCities.map((city) => (
          <div key={city.name} className="col">
            <WeatherMiniCard city={city} temperatureUnit={temperatureUnit} />
          </div>
        ))}
        {!isLoading && favoriteCities.length === 0 && (
            <Typography>No favorite cities, add via forecast page or current city on home page</Typography>
        )}
      </div>
      {isLoading && (
        <div className="mt-4">
          <Spinner />
        </div>
      )}
    </div>
  );
}
