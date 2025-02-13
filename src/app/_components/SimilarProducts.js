"use client";
import React, { useEffect, useState } from 'react';
import { subCategoryProducts } from '@/app/_service/ProductService'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setProductData } from '../_lib/utilReducer';
const SimilarProducts = ({ subCategoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch=useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await subCategoryProducts(subCategoryId);
        setProducts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subCategoryId]);
   const handleNavigation=(product)=>{
        
      router.push(`/product/${product.id}`);
      }
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Similar Products</h2>
      <div className="flex overflow-x-auto space-x-6 p-4">
        {products.map((product) => (
          <div key={product.id} className="min-w-[220px] bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-md mb-2" />
            <h3 className="text-lg font-semibold truncate">{product.name}</h3>
            <p className="text-gray-700">${product.offerPrice.toFixed(2)}</p>
            <button 
              onClick={() => handleNavigation(product)} 
              className="mt-3 w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;