export type Weather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
};

export type WeatherForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  dt_txt: string;
};

export type WeatherForecast = {
  list: WeatherForecastItem[];
  city: {
    name: string;
    country: string;
    coord: {
      lat: number;
      lon: number;
    };
  };
};
