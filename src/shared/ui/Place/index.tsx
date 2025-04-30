'use client';

import s from './Place.module.scss';
import { getUserCity } from '@/shared/lib/getUserCity';
import { useState, useEffect } from 'react';
import { useWeatherStore } from '@/entities/weather/model/store';

export const Place = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentCity, setCurrentCity } = useWeatherStore();

  useEffect(() => {
    const fetchCity = async () => {
      try {
        setIsLoading(true);
        const userCity = await getUserCity();
        if (userCity === null) {
          setError('Please enable location access to see your city');
        } else {
          setCurrentCity(userCity);
        }
      } catch (err) {
        setError('Unable to get your location');
        console.error('Error getting location:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCity();
  }, [setCurrentCity]);

  return (
    <div className={s.place}>
      <i className="bi bi-geo-alt"></i>
      {isLoading ? 'Detecting location...' : error ? error : currentCity}
    </div>
  );
};
