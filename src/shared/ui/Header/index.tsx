'use client';
import Button from '@/shared/ui/Button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Place } from '@/shared/ui/Place';
import { useWeatherStore } from '@/entities/weather/model/store';
import { Select } from '@/shared/ui/Select';
import { useEffect } from 'react';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const search = useWeatherStore((state) => state.searchCity);
  const {
    temperatureUnit,
    temperatureOptions,
    setTemperatureUnit,
    fetchCityWeather,
  } = useWeatherStore();

  useEffect(() => {
    if (pathname.includes('/weather/')) {
      const city = pathname.split('/weather/')[1];
      if (city) {
        fetchCityWeather(city);
      }
    }
  }, [temperatureUnit, pathname, fetchCityWeather]);

  const handleTemperatureChange = (unit: 'C' | 'F') => {
    setTemperatureUnit(unit);
    if (pathname.includes('/weather/')) {
      router.refresh();
    }
  };
  return (
    <div className="d-flex justify-content-between align-items-center py-3 px-4">
      <Place />
      <div className="d-flex gap-3">
        <Link href="/" className="text-decoration-none">
          <Button variant={pathname === '/' ? 'primary' : 'outline-primary'}>
            Home
          </Button>
        </Link>
        <Link href={`/weather/${search}`} className="text-decoration-none">
          <Button
            variant={
              pathname.includes('/weather') ? 'primary' : 'outline-primary'
            }
          >
            Forecast
          </Button>
        </Link>
        <Link href="/favorites" className="text-decoration-none">
          <Button
            variant={pathname === '/favorites' ? 'primary' : 'outline-primary'}
          >
            Favorites
          </Button>
        </Link>
      </div>
      <Select<'C' | 'F'>
        options={temperatureOptions}
        value={temperatureUnit}
        onChange={handleTemperatureChange}
      />
    </div>
  );
};
