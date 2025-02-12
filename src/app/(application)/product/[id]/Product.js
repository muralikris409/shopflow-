"use client";
import { fetchData } from '@/app/_lib/productReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { Star, ShoppingCart, Bolt } from 'lucide-react';
import SimilarProducts from '@/app/_components/SimilarProducts';
import UserCartService from "../../../_service/UserCartService";
import { addOrRemoveProductFromWishlist } from '@/app/_service/WishListService';
import { createOrder } from '@/app/_service/OrderService';
import { useRouter } from 'next/navigation';
import { setProductData } from '@/app/_lib/utilReducer';
import { useToast } from '@/hooks/use-toast';
import { addProduct } from '@/app/_service/GuestCartService';
export default function Product({ productId = 1 }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const {toast} =useToast();
    const { data = [], loading, error } = useSelector(state => state.product);
    const product = data?.data;
    const isLoggedIn = useSelector((state) => state.userData?.user);
    const token = useSelector((state) => state.userData?.token);
    const userCartService = new UserCartService();

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loadingState, setLoadingState] = useState({ buy: false, cart: false, wishlist: false });

    useEffect(() => {
        dispatch(fetchData(`/products/getProductById?productId=${productId}`));
    }, [dispatch, productId]);

    const showMessage = (msg, type) => {
      
        
        toast(type === "success" 
            ? { 
                title: 'Success', 
                description: msg 
              } 
            : { 
                title: 'Error', 
                description: msg, 
                variant: "destructive" 
              }
          );
           

      
    };

    const handleNavigation = (order) => {
        const data = { orders: order };
        dispatch(setProductData({ orders: { ...data } }));
        router.push(`/checkout/${order?.data?.id}`);
    };

    const handleBuy = async () => {
        setLoadingState(prev => ({ ...prev, buy: true }));
        try {
            const userId = isLoggedIn ? isLoggedIn.id : "";
            const items = [{ productId: product.id, quantity: 1 }];
            const order = await createOrder( items);
            showMessage('Order created successfully! Redirecting to checkout...', 'success');
            handleNavigation(order);
        } catch (err) {
            console.error('Order creation failed:', err);
            showMessage('Failed to create order. Please try again.', 'error');
        } finally {
            setLoadingState(prev => ({ ...prev, buy: false }));
        }
    };

    const handleAddToCart = async () => {
        setLoadingState(prev => ({ ...prev, cart: true }));
        try {
            if (isLoggedIn) {
                const response = await userCartService.addItemToCart(isLoggedIn.id, product.id);
                showMessage(response.message || 'Product added to your cart!', 'success');
            } else {
                addProduct(product);
                showMessage('Product added to your guest cart!', 'success');
            }
        } catch (error) {
            showMessage('An unexpected error occurred. Please try again.', 'error');
            console.error("Error adding to cart:", error);
        } finally {
            setLoadingState(prev => ({ ...prev, cart: false }));
        }
    };

    const handleAddorRemoveFromWishlist = async () => {
        setLoadingState(prev => ({ ...prev, wishlist: true }));
        console.log(product)
        try {
            const response = await addOrRemoveProductFromWishlist(product.id, token);
            showMessage(response?.data?.message || "Product added to Wishlist", 'success');
        } catch (error) {
            showMessage('An unexpected error occurred. Please try again.', 'error');
            console.error("Error updating wishlist:", error);
        } finally {
            setLoadingState(prev => ({ ...prev, wishlist: false }));
        }
    };

    if (loading) return <p className="text-center text-lg font-medium">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (!product) return <p className="text-center text-gray-600">No product found</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden lg:max-h-96">
                {/* Left - Image Section */}
                <div className="lg:w-2/5 p-4 flex justify-center items-center bg-gray-100">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="object-contain w-full h-auto max-w-xs rounded-lg"
                    />
                </div>

                {/* Right - Details Section */}
                <div className="lg:w-3/5 p-6 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold flex items-center">
                            {product.rating} <Star className="ml-1 w-4 h-4" />
                        </span>
                        <span className="text-gray-500">({product.reviews} Reviews)</span>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-gray-800">₹{product.offerPrice}</span>
                        <span className="text-gray-500 line-through">₹{product.actualPrice}</span>
                        <span className="text-orange-500 font-semibold">{product.discountPercentage}% off</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm">{product.description}</p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-self-end">
                        <button 
                            onClick={isLoggedIn ? handleBuy : () => showMessage('Please log in to buy.', 'error')}
                            className="bg-gray-800 text-white px-6 py-2 rounded flex items-center justify-center gap-2 text-lg font-medium w-full sm:w-auto"
                            disabled={loadingState.buy}
                        >
                            {loadingState.buy ? (
                                <span className="animate-pulse">Loading...</span>
                            ) : (
                                <>
                                    <Bolt className="w-5 h-5" /> Buy Now
                                </>
                            )}
                        </button>
                        <button 
                            onClick={handleAddToCart}
                            className="bg-gray-800 text-white px-6 py-2 rounded flex items-center justify-center gap-2 text-lg font-medium w-full sm:w-auto"
                            disabled={loadingState.cart}
                        >
                            {loadingState.cart ? (
                                <span className="animate-pulse">Loading...</span>
                            ) : (
                                <>
                                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                                </>
                            )}
                        </button>
                        <button 
                            onClick={handleAddorRemoveFromWishlist}
                            className="bg-gray-800 text-white px-6 py-2 rounded flex items-center justify-center gap-2 text-lg font-medium w-full sm:w-auto"
                            disabled={loadingState.wishlist}
                        >
                            {loadingState.wishlist ? (
                                <span className="animate-pulse">Loading...</span>
                            ) : (
                                <>
                                    <Star className="w-5 h-5" /> Wishlist
                                </>
                            )}
                        </button>
                    </div>

                    {/* Message Display */}
                    {message && (
                        <div className={`mt-4 p-2 text-sm ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
            <SimilarProducts subCategoryId={product.subCategoryId || 1} />
        </div>
    );
}