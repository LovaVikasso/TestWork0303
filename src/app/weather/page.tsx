'use client';

import {PageHeader} from "@/shared/ui/PageHeader";
import {SearchForm} from "@/features/SearchForm";
import {Typography} from "@/shared/ui/Typography";

export default function WeatherDefaultPage() {
    return (
        <div className="container mt-5">
            <PageHeader title="Weather Search"/>
            <SearchForm/>
            <Typography>Enter city name to get forecast</Typography>
        </div>
    );
}