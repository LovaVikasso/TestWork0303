'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useWeatherStore } from '@/entities/weather/model/store';
import { PageHeader } from '@/shared/ui/PageHeader';
import { Typography } from '@/shared/ui/Typography';
import { WeatherMiniCard } from '@/entities/weather/ui/WeatherMiniCard';
import { Spinner } from '@/shared/ui/Spinner';
import { Toast } from '@/shared/ui/Toaster';

export default function FavoritesPage() {
  const {
    favoriteCities,
    temperatureUnit,
    isLoading,
    error,
    updateFavoriteWeather,
    setLoading,
    setError,
  } = useWeatherStore();

  const isInitialMount = useRef(true);

  useEffect(() => {
    const updateFavoritesWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        await Promise.all(
          favoriteCities.map((city) => updateFavoriteWeather(city.name))
        );
      } catch (err) {
        setError('Failed to update weather data');
      } finally {
        setLoading(false);
      }
    };

    if (isInitialMount.current || favoriteCities.length > 0) {
      updateFavoritesWeather();
      isInitialMount.current = false;
    }
  }, [favoriteCities.length]);

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
      </div>
      {isLoading && <Spinner />}
    </div>
  );
}
