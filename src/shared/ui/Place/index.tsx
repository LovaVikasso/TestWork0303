'use client';

import s from './Place.module.scss';
import { getUserCity } from '@/shared/lib/getUserCity';
import { useState, useEffect } from 'react';

export const Place = () => {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchCity = async () => {
      const userCity = await getUserCity();
      setCity(userCity);
    };
    fetchCity();
  }, []);
console.log(city, "city")
  return (
    <div className={s.place}>
      <i className="bi bi-geo-alt"></i>
      {city || 'Location'}
    </div>
  );
};
