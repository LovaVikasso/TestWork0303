import { useWeatherStore } from '@/entities/weather/model/store';
import { FavoriteIndicator } from '@/shared/ui/FavoriteIndicator';

type Props = {
  city: string;
};

export const FavoriteButton = ({ city }: Props) => {
  const { isFavorite, addFavorite, removeFavorite, currentWeather } =
    useWeatherStore();

  const handleClick = () => {
    if (isFavorite(city)) {
      removeFavorite(city);
    } else if (currentWeather) {
      addFavorite({
        name: currentWeather.name,
        country: currentWeather.sys.country,
        temperature: currentWeather.main.temp,
        description: currentWeather.weather[0].description,
        icon: currentWeather.weather[0].icon,
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`btn ${
        isFavorite(city) ? 'btn-outline-danger' : 'btn-outline-primary'
      } 
                 d-flex align-items-center gap-2`}
      disabled={!currentWeather && !isFavorite(city)}
    >
      <FavoriteIndicator isFilled={isFavorite(city)} />
      {isFavorite(city) ? 'Favorite ✓' : 'Add Favorite'}
    </button>
  );
};
