  "use client";
  import { addProduct } from '@/app/(application)/_service/GuestCartService';
  import React, { useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import UserCartService from "../../_service/UserCartService";
  import { addOrRemoveProductFromWishlist } from '@/app/(application)/_service/WishListService';
  import { useRouter } from 'next/navigation';
  import { createOrder } from '@/app/(application)/_service/OrderService';
import SimilarProducts from '@/app/_components/SimilarProducts';
import { setHistory, setProductData } from '@/app/_lib/utilReducer';

  const ProductView = ({ product = {} }) => {
    const isLoggedIn = useSelector((state) => state.session.user);
    const token = useSelector((state) => state.session.token);
    const router = useRouter();
    const dispatch=useDispatch();
    const {
      id,
      name = "Unknown Product",
      description = "No description available.",
      actualPrice = 0,
      offerPrice = 0,
      discountPercentage = 0,
      rating = 0,
      stock = 0,
      image = "/_assets/image.png",
      subCategoryId
    } = product;
    console.log(subCategoryId);
    const reviewsCount = 1209;
    const userCartService = new UserCartService();

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState({ buy: false, cart: false, wishlist: false });
    const showMessage = (msg, type) => {
      setMessage(msg);
      setMessageType(type);
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000); 
    };

    const handleNavigation = (order) => {
      const data = { orders: order };
      dispatch(setProductData({orders:{...data}}))
      
      router.push(`/checkout`);
    };

    const handleBuy = async () => {
      setLoading(prev => ({ ...prev, buy: true }));
      try {
        const userId = isLoggedIn ? isLoggedIn.id : "";
        const items = [{ productId: id, quantity: 1 }];
        const order = await createOrder(userId, items);
        console.log("Order:", order);
        showMessage('Order created successfully! Redirecting to checkout...', 'success');
        handleNavigation(order);
      } catch (err) {
        console.error('Order creation failed:', err);
        showMessage('Failed to create order. Please try again.', 'error');
      } finally {
        setLoading(prev => ({ ...prev, buy: false }));
      }
    };

    const handleAddToCart = async () => {
      setLoading(prev => ({ ...prev, cart: true }));
      console.log("Adding product to cart:", product);
      try {
        if (isLoggedIn) {
          const response = await userCartService.addItemToCart(isLoggedIn.id, id);
          if (response.status === 200 || response.status === 201) {
            showMessage('Product added to your cart!', 'success');
          } else {
            showMessage(response.message || 'Failed to add product to cart. Please try again.', 'error');
          }
        } else {
          addProduct(product);
          showMessage('Product added to your guest cart!', 'success');
        }
      } catch (error) {
        showMessage('An unexpected error occurred. Please try again.', 'error');
        console.error("Error adding to cart:", error);
      } finally {
        setLoading(prev => ({ ...prev, cart: false }));
      }
    };

    const handleAddorRemoveFromWishlist = async () => {
      setLoading(prev => ({ ...prev, wishlist: true }));
      try {
        const response = await addOrRemoveProductFromWishlist(isLoggedIn.id, id, token);
        showMessage(response?.data?.message || "Product added to Wishlist", 'success');
      } catch (error) {
        showMessage('An unexpected error occurred. Please try again.', 'error');
        console.error("Error updating wishlist:", error);
      } finally {
        setLoading(prev => ({ ...prev, wishlist: false }));
      }
    };
    const handleGuest=()=>{
      dispatch(setHistory({route:`/product/${product.name}`}))
      dispatch(setProductData({id:product.id}));
      router.push("/auth");
    }

    return (
      <>
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <nav className="flex">
            <ol role="list" className="flex items-center">
              <li className="text-left">
                <a href="#" className="rounded-md p -1 text-sm font-medium text-gray-600 hover:text-gray-800">Home</a>
              </li>
              <li className="text-left">
                <span className="mx-2 text-gray-400">/</span>
                <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 hover:text-gray-800">Products</a>
              </li>
              <li className="text-left">
                <span className="mx-2 text-gray-400">/</span>
                <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 hover:text-gray-800">{product.name}</a>
              </li>
            </ol>
          </nav>

          {/* Product Content */}
          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Product Image */}
            <div className="relative lg:col-span-3 h-80 w-80">
              <img className="object-contain h-full w-full" src={image} alt={name} />
              {isLoggedIn&&
              <button 
                onClick={handleAddorRemoveFromWishlist} 
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-200"
                aria-label="Add to Wishlist"
                disabled={loading.wishlist}
              >
                
                {loading.wishlist ? (
                  <svg className="animate-spin h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"></path>
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
              </button>}
            </div>

            {/* Product Details */}
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <div className="mt-5 flex items-center">
                {/* Ratings */}
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      className={`block h-4 w-4 align-middle ${index < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-400'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3. 292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm font-medium text-gray-500">{reviewsCount} Reviews</p>
              </div>

              {/* Price */}
              <h2 className="mt-8 text-base text-gray-900">Price</h2>
              <div className="mt-3 flex items-center">
                <span className="text-3xl font-bold">${offerPrice.toFixed(2)}</span>
                <span className="ml-2 text-lg line-through text-gray-500">${actualPrice.toFixed(2)}</span>
                <span className="ml-2 text-sm text-green-600">({discountPercentage.toFixed(2)}% off)</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 grid grid-col md:grid-row lg:grid-row gap-5 items-center space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <button onClick={isLoggedIn?handleBuy:handleGuest} className="inline-flex items-center justify-center rounded-md bg-gray-900 px-12 py-3 text-white hover:bg-gray-800" disabled={loading.buy}>
                  {loading.buy ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"></path>
                    </svg>
                  ) : 'Buy Now'}
                </button>
                <button onClick={handleAddToCart} className="inline-flex items-center justify-center rounded-md bg-gray-900 px-12 py-3 text-white hover:bg-gray-800" disabled={loading.cart}>
                  {loading.cart ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"></path>
                    </svg>
                  ) : 'Add to Cart'}
                </button>
              </div>

              {/* Message Display */}
              {message && (
                <div className={`mt-4 p-2 text-sm ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </div>
              )}

              {/* Additional Details */}
              <ul className="mt-8 space-y-2">
                <li className="flex items-center text-sm font-medium text-gray-600">
                  <svg className="mr-2 block h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Free shipping worldwide
                </li>
                <li className="flex items-center text-sm font-medium text-gray-600">
                  <svg className="mr-2 block h-5 w-5 text-gray-500" xmlns="http://www.w3.org/200 ```javascript
  0/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Cancel Anytime
                </li>
              </ul>
            </div>

            {/* Product Description */}
            <div className="lg:col-span-3">
              <div className="prose max-w-none">
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SimilarProducts subCategoryId={subCategoryId}/>

      </>
    );
  };

  export default ProductView;