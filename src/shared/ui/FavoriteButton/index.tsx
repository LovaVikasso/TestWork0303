import {useWeatherStore} from '@/entities/weather/model/store';
import {FavoriteIndicator} from '@/shared/ui/FavoriteIndicator';

type Props = {
    city: string;
    page: "search" | "favorite"
};

export const FavoriteButton = ({city, page}: Props) => {
    const {isFavorite, addFavorite, removeFavorite, searchResults, currentWeather} =
        useWeatherStore();
    const handleClick = () => {
        if (isFavorite(city)) {
            removeFavorite(city);
        } else if (page === "search" && searchResults && searchResults.length > 0) {
            const searchResult = searchResults[0]
            addFavorite({
                name: searchResult.name,
                country: searchResult.country,
                temperature: searchResult.temperature,
                description: searchResult.description,
                icon: searchResult.icon,
            });
        } else if (page === "favorite" && currentWeather) {
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
            disabled={!searchResults && !isFavorite(city)}
        >
            <FavoriteIndicator isFilled={isFavorite(city)}/>
            {isFavorite(city) ? 'Favorite ✓' : 'Add Favorite'}
        </button>
    );
};
