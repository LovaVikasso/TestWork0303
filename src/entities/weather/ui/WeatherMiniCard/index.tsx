import React from 'react';
import {Typography} from '@/shared/ui/Typography';
import Link from 'next/link';
import {CityWeather, TemperatureUnit} from '@/entities/weather/model/store';
import {getTemperatureSymbol} from '@/shared/lib/getTempretureSymbol';
import {FavoriteButton} from '@/shared/ui/FavoriteButton';

type Props = {
    city: CityWeather;
    temperatureUnit: TemperatureUnit;
};

export const WeatherMiniCard = ({city, temperatureUnit}: Props) => {
    return (
        <div className="card h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <Typography as="h5" className="card-title">
                            {city.name}
                        </Typography>
                        <Typography className="card-text">
                            {Math.floor(city.temperature)}{' '}
                            {getTemperatureSymbol(temperatureUnit)}, {city.description}
                        </Typography>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <Link href={`/weather/${city.name}`} className="btn btn-primary">
                        Details
                    </Link>
                    <FavoriteButton city={city.name} page="search"/>
                </div>
            </div>
        </div>
    );
};
