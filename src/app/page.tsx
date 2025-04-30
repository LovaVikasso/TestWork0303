'use client';

import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {SearchForm} from "@/features/SearchForm";

export default function Home() {


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <SearchForm/>
                </div>
            </div>
        </div>
    );
}
