"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="mt-4 text-2xl font-semibold text-gray-600">
                    Oops! We can't find that page.
                </p>
                <p className="mt-2 text-gray-500 italic">
                    "Every mistake is a step forward, as long as you keep moving." <br /> – Anonymous
                </p>
                <div className="mt-6">
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-500"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => router.push('/shop')}
                        className="ml-4 px-6 py-2 text-gray-700 bg-gray-200 rounded-lg shadow hover:bg-gray-300"
                    >
                        Explore Products
                    </button>
                </div>
            </div>
            <div className="mt-10">
                <img
                    src="https://img.freepik.com/free-vector/404-error-page-found-concept-illustration_114360-1811.jpg"
                    alt="404 Not Found"
                    className="w-96 h-auto"
                />
            </div>
        </div>
    );
};

export default NotFound;
