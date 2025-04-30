'use client';

import Link from 'next/link';
import { useWeatherStore } from '@/entities/weather/model/store';
import {PageHeader} from "@/shared/ui/PageHeader";

export default function FavoritesPage() {
  const favorites = useWeatherStore((state) => state.favoriteCities);

  return (
    <div className="container mt-5">
      <PageHeader title="Favorites" />
      <div className="row">
        {favorites.map((city) => (
          <div key={city.name} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{city.name}</h5>
                <p className="card-text">
                  {city.temperature}°C, {city.description}
                </p>
                <Link
                  href={`/weather/${city.name}`}
                  className="btn btn-primary"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
