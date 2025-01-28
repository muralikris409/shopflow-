"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

export default function ViewAllProductsButton() {
  const router = useRouter();

  return (
    <div className="flex justify-center py-10 w-full">
      <button
        onClick={() => router.push('/products')}
        className="px-6 py-3 bg-gray-900 text-amber-200 rounded-lg shadow-2xl hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring focus:ring-amber-300"
        style={{
          animation: 'float 2s ease-in-out infinite'
        }}
      >
        View All Products
      </button>
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); 
          }
          50% {
            transform: translateY(-10px); 
            box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.4); 
          }
          100% {
            transform: translateY(0);
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); 
          }
        }
      `}</style>
    </div>
  )
}
