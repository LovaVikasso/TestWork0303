import React, { FormEvent } from 'react';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import { useWeatherStore } from '@/entities/weather/model/store';

export const SearchForm = () => {
  const router = useRouter();
  const { searchCity, searchFormError, setSearchCity, setSearchFormError } =
    useWeatherStore();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchCity.trim()) {
      setSearchFormError('Please enter a city name');
      return;
    }
    setSearchFormError(null);
    router.push(`/weather/${searchCity}`);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="d-flex gap-2 align-items-start">
        <div className="flex-grow-1">
          <Input
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter city name"
            fullWidth
            error={searchFormError || undefined}
          />
        </div>
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
};
