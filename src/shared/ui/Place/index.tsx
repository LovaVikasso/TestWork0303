'use client';

import s from './Place.module.scss';
import { getUserCity } from '@/shared/lib/getUserCity';
import { useState, useEffect } from 'react';

export const Place = () => {
  const [city, setCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        setIsLoading(true);
        const userCity = await getUserCity();
        if (userCity === null) {
          setError('Please enable location access to see your city');
        }
        setCity(userCity);
      } catch (err) {
        setError('Unable to get your location');
        console.error('Error getting location:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCity();
  }, []);

  return (
    <div className={s.place}>
      <i className="bi bi-geo-alt"></i>
      {isLoading ? 'Detecting location...' : error ? error : city || 'Location'}
    </div>
  );
};
