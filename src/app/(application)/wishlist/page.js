'use client';

import React from 'react';
import { useEffect,useState } from 'react';
import { loadWishlist, removeProductFromWishlist } from '../_service/WishListService';
import { useDispatch, useSelector } from 'react-redux';
import { addOrRemoveProductFromWishlist } from '../_service/WishListService';
import Link from 'next/link';
import { setProductData } from '../../_lib/utilReducer';
import { useRouter } from 'next/navigation';
const Wishlist = () => {
  const [products, setProducts] = useState([]);
  
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.session.user?.id);
  const token = useSelector((state) => state.session.token);    

  

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (userId) {
          const wishlistProducts = await loadWishlist(userId, token);
          console.log("wishlist:",wishlistProducts);

          setProducts(wishlistProducts);
        }
      } catch (err) {
        setError('Failed to load wishlist. Please try again later.');
      }
    };

    fetchWishlist();
  }, [userId, token]);

  const handleRemoveProduct = async (productId) => {
    console.log(products);
    try {
      if (userId) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));
        await addOrRemoveProductFromWishlist(userId, productId, token);
      }
    } catch (err) {
      setError('Failed to remove product from wishlist. Please try again later.');
      console.log(err)
    }
  };

  return (
    <section className="h-1/3 bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          {
            (products.length > 0) ?
            <h1 className="text-2xl font-semibold text-gray-900">Your Wishlist</h1> :
            <h1 className="text-2xl font-semibold text-gray-900">Your Wishlist is empty</h1>
          }
        </div>

        {error && (
          <div className="text-center text-red-500 mt-4">
            {error}
          </div>
        )}

        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <ul className="-my-8">
                  {products.map((product, index) => (
                    <WishlistTile
                      key={index}
                      product={product.product}
                      onRemoveProduct={handleRemoveProduct}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;

function WishlistTile({ product, onRemoveProduct }) {
  const router=useRouter();

  const dispatch=useDispatch();
  const handleNavigation=()=>{
    
  dispatch(setProductData({id:product.id}));
  router.push(`/product/${product.name}`);

  }
  return (
    <li  className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
      <div className="shrink-0">
        <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={product.image||"/_assets/image.png"} alt={product.name} />
      </div>

      <div className="relative flex flex-1 flex-col justify-between">
        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
          <div onClick={handleNavigation} className="pr-8 sm:pr-5">
            <p className="text-base font-semibold text-gray-900">{product.name}</p>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-500 line-through">${product.actualPrice}</p>
              <p className="text-sm text-orange-500">${product.offerPrice}</p>
              <p className="text-sm text-green-500">({product.discountPercentage}% off)</p>
            </div>
            <p className="text-sm text-gray-500">Rating: {product.rating} / 5</p>
          </div>
        </div>

        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
          <button
            onClick={() => onRemoveProduct(product.id)}
            type="button"
            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}


