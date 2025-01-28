"use client";
import React, { useEffect, useState } from 'react';
import { getNewArrivals } from '../_service/ProductService';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setProductData } from '../_lib/utilReducer';
const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const router=useRouter();
    const dispatch=useDispatch();
     const handleNavigation=(product)=>{
        
      dispatch(setProductData({id:product.id}));
      router.push(`product/${product.name}`);
      }
    useEffect(() => {
        async function fetchNewArrivals() {
            try {
                const data = await getNewArrivals();
               
                setProducts(data.data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchNewArrivals();
    }, []);

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }
    

    return (
        <div className="p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
<h2 className="text-3xl text-white-50 font-bold mb-6 text-shadow-glow">
  New Arrivals
</h2>
            <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
                <div className="grid grid-flow-col auto-cols-max gap-4">
                    {products?.map((product, index) => (
                        <div
                        onClick={()=>handleNavigation(product)}
                            key={index}
                            className="w-64 p-4 bg-white rounded-lg shadow-lg text-gray-800 transform hover:scale-105 transition-transform"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold">{product.name}</h3>
                                <p className="text-sm text-gray-600">{product.description}</p>
                                <div className="mt-2">
                                    <span className="text-xl font-bold text-blue-600">
                                        ${product.offerPrice}
                                    </span>
                                    <span className="line-through text-gray-400 ml-2">
                                        ${product.actualPrice}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;