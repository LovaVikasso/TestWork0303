'use client';

import Image from 'next/image';
import { Typography } from '@/shared/ui/Typography';
import { WeatherForecastItem } from '@/entities/weather/types';
import { TemperatureUnit } from '@/entities/weather/model/store';

type Props = {
  forecast: WeatherForecastItem;
  temperatureUnit: TemperatureUnit;
};

export const ForecastCard = ({ forecast, temperatureUnit }: Props) => {
  const date = new Date(forecast.dt_txt).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const getTemperatureSymbol = () => (temperatureUnit === 'C' ? '°C' : '°F');

  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body p-2 text-center">
          <Typography as="h6" className="card-title mb-2">
            {date}
          </Typography>
          <div className="d-flex flex-column align-items-center">
            <Image
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt={forecast.weather[0].description}
              width={40}
              height={40}
              unoptimized
            />
            <div className="mt-2">
              <Typography className="mb-0 fw-bold">
                {Math.round(forecast.main.temp)}
                {getTemperatureSymbol()}
              </Typography>
              <Typography className="text-capitalize mb-0 small">
                {forecast.weather[0].description}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
