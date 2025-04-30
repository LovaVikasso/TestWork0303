import { useWeatherStore } from '@/entities/weather/model/store';
import { FavoriteIndicator } from '@/shared/ui/FavoriteIndicator';

type Props = {
  city: string;
};

export const FavoriteButton = ({ city }: Props) => {
  const { isFavorite, addFavorite, removeFavorite } = useWeatherStore();

  const handleClick = () => {
    if (isFavorite(city)) {
      removeFavorite(city);
    } else {
      addFavorite({
        name: city,
        country: '',
        temperature: 0,
        description: '',
      });
    }
  };

  return (
    <button onClick={handleClick} className={`btn ${isFavorite(city) ? 'btn-outline-danger' : 'btn-outline-primary'} 
               d-flex align-items-center gap-2`}>
      <FavoriteIndicator isFilled={isFavorite(city)} />
      {isFavorite(city) ? 'Favorite ✓' : 'Add Favorite'}
    </button>
  );
};
