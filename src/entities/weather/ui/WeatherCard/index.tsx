import { Weather } from '@/entities/weather/types';
import { WeatherIcon } from '@/shared/ui/WeatherIcon';
import { FavoriteButton } from '@/shared/ui/FavoriteButton';
import { formatTime } from '@/shared/lib/formatTime';
import { Typography } from '@/shared/ui/Typography';
import { TemperatureUnit } from '@/entities/weather/model/store';
import {getTemperatureSymbol} from "@/shared/lib/getTempretureSymbol";

type Props = {
  weather: Weather;
  temperatureUnit: TemperatureUnit;
};

export const WeatherCard = ({ weather, temperatureUnit }: Props) => {

  return (
    <div className="card mb-4 h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <Typography as="h3" className="card-title mb-0">
            {weather.name}, {weather.sys.country}
          </Typography>
          <FavoriteButton city={weather.name} page="favorite" />
        </div>
        <div className="d-flex align-items-center mb-3">
          <WeatherIcon
            icon={weather.weather[0].icon}
            description={weather.weather[0].description}
          />
          <div>
            <Typography as="h3" className="mb-0">
              {Math.round(weather.main.temp)}
              {getTemperatureSymbol(temperatureUnit)}
            </Typography>
            <Typography className="text-capitalize mb-0">
              {weather.weather[0].description}
            </Typography>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Typography>
              Feels like: {Math.round(weather.main.feels_like)}
              {getTemperatureSymbol(temperatureUnit)}
            </Typography>
            <Typography>Humidity: {weather.main.humidity}%</Typography>
            <Typography>Visibility: {weather.visibility / 1000} km</Typography>
            <Typography>Sunrise: {formatTime(weather.sys.sunrise)}</Typography>
          </div>
          <div className="col-6">
            <Typography>Wind: {weather.wind.speed} m/s</Typography>
            <Typography>Pressure: {weather.main.pressure} hPa</Typography>
            <Typography>Clouds: {weather.clouds.all}%</Typography>
            <Typography>Sunset: {formatTime(weather.sys.sunset)}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
