'use client';

import {PageHeader} from "@/shared/ui/PageHeader";
import {SearchForm} from "@/features/SearchForm";

export default function WeatherDefaultPage() {
    return (
        <div className="container mt-5">
            <PageHeader title="Weather Search"/>
            <SearchForm/>
        </div>
    );
}