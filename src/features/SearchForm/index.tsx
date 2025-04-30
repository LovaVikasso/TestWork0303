import React, {FormEvent, useState} from 'react';
import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import {useRouter} from "next/navigation";

export const SearchForm = () => {
    const [city, setCity] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (!city.trim()) {
            setError('Please enter a city name');
            return;
        }
        router.push(`/weather/${city}`);
    };

    return (
        <form onSubmit={handleSearch} className="mb-4">
            <div className="d-flex gap-2 align-items-start">
                <div className="flex-grow-1">
                    <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name"
                        fullWidth
                        error={error || undefined}
                    />
                </div>
                <Button type="submit">
                    Search
                </Button>
            </div>
        </form>
    );
};