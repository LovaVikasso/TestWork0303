'use client';

import { use, useEffect } from 'react';
import { useWeatherStore } from '@/entities/weather/model/store';
import { WeatherCard } from '@/entities/weather/ui/WeatherCard';
import { PageHeader } from '@/shared/ui/PageHeader';
import { ForecastCard } from '@/entities/weather/ui/ForecastCard';
import { Chart } from '@/features/Chart';
import { Spinner } from '@/shared/ui/Spinner';
import { SearchForm } from '@/features/SearchForm';
import { Toast } from '@/shared/ui/Toaster';

type Props = {
  params: Promise<{
    city: string;
  }>;
}

export default function WeatherPage({ params }: Props) {
  const { city } = use(params);
  const {
    currentWeather,
    forecast,
    isLoading,
    error,
    fetchCityWeather,
    temperatureUnit,
  } = useWeatherStore();

  useEffect(() => {
    if (city) {
      fetchCityWeather(city);
    }
  }, [city]);

  const dailyForecasts = forecast?.filter((item) => {
    const date = new Date(item.dt_txt);
    return date.getHours() === 12;
  });
  return (
    <div className="container mt-5">
      <PageHeader title="Weather forecast" />
      <SearchForm />
      {isLoading && <Spinner />}
      {!isLoading && currentWeather && (
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <WeatherCard
              weather={currentWeather}
              temperatureUnit={temperatureUnit}
            />
          </div>

          <div className="col-12 col-lg-6">
            <div className="d-flex flex-column" style={{ height: '100%' }}>
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-2 mb-3">
                {forecast
                  .filter((_, index) => index % 8 === 0)
                  .map((day) => (
                    <ForecastCard
                      key={day.dt}
                      forecast={day}
                      temperatureUnit={temperatureUnit}
                    />
                  ))}
              </div>
              <div className="card flex-grow-1">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <Chart data={dailyForecasts} width={450} height={100} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <Toast message={error} />}
    </div>
  );
}
