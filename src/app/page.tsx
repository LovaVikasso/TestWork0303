'use client';

import { SearchForm } from '@/features/SearchForm';
import { useWeatherStore } from '@/entities/weather/model/store';
import { WeatherMiniCard } from '@/entities/weather/ui/WeatherMiniCard';
import { useEffect } from 'react';

export default function Home() {
  const { currentCity, searchResults, searchWeather, temperatureUnit } =
    useWeatherStore();

  useEffect(() => {
    if (currentCity) {
    searchWeather(currentCity);
    }
  }, [currentCity, searchWeather]);
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <SearchForm />
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <WeatherMiniCard
              city={searchResults[0]}
              temperatureUnit={temperatureUnit}
            />
          </div>
        </div>
      )}
    </div>
  );
}
