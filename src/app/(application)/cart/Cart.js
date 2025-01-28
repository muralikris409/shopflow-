'use client';

import React, { useState, useEffect } from 'react';
import {
  decreaseQuantity as guestDecreaseQuantity,
  getCart as guestGetCart,
  increaseQuantity as guestIncreaseQuantity,
  removeProduct as guestRemoveProduct,
} from '../_service/GuestCartService';
import UserCartService from '../_service/UserCartService';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createOrder } from '../_service/OrderService';
import { setProductData } from '../../_lib/utilReducer';
import { setHistory } from '../../_lib/utilReducer';
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [error, setError] = useState(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userCartService = new UserCartService();
  const isLoggedIn = useSelector((state) => state.session.user);
  const router = useRouter();

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        if (isLoggedIn) {
          const userCart = await userCartService.viewCart(isLoggedIn.id);
          setProducts(userCart.items);
          setTotalBill(userCart.totalAmount);
        } else {
          const guestCart = typeof window !== 'undefined' ? guestGetCart() : [];
          setProducts(guestCart);
        }
      } catch (err) {
        setError('Failed to load cart. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isLoggedIn]);

  const handleIncreaseQuantity = async (productId, setTileLoading) => {
    try {
      setTileLoading(true);
      if (isLoggedIn) {
        await userCartService.updateCartCount(isLoggedIn.id, productId, 'increase');
        const userCart = await userCartService.viewCart(isLoggedIn.id);
        setProducts(userCart.items);
        setTotalBill(userCart.totalAmount);
      } else {
        guestIncreaseQuantity(productId);
        setProducts(guestGetCart());
      }
    } catch (err) {
      setError('Failed to update item quantity. Please try again later.');
    } finally {
      setTileLoading(false);
    }
  };

  const handleDecreaseQuantity = async (productId, setTileLoading) => {
    try {
      setTileLoading(true);
      if (isLoggedIn) {
        await userCartService.updateCartCount(isLoggedIn.id, productId, 'decrease');
        const userCart = await userCartService.viewCart(isLoggedIn.id);
        setProducts(userCart.items);
        setTotalBill(userCart.totalAmount);
      } else {
        guestDecreaseQuantity(productId);
        setProducts(guestGetCart());
      }
    } catch (err) {
      setError('Failed to update item quantity. Please try again later.');
    } finally {
      setTileLoading(false);
    }
  };

  const handleRemoveProduct = async (productId, setTileLoading) => {
    try {
      setTileLoading(true);
      if (isLoggedIn) {
        await userCartService.deleteFromCart(isLoggedIn.id, productId);
        const userCart = await userCartService.viewCart(isLoggedIn.id);
        setProducts(userCart.items);
        setTotalBill(userCart.totalAmount);
      } else {
        guestRemoveProduct(productId);
        setProducts(guestGetCart());
      }
    } catch (err) {
      setError('Failed to remove product from cart. Please try again later.');
    } finally {
      setTileLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoadingCheckout(true);
    try {
      const items = products?.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      }));
      const {order } = await createOrder(isLoggedIn.id, items);
      console.log(order)
      const data = {
        orders: order
      };
      dispatch(setProductData({orders:{...data}}))
      router.push(`/checkout`);
    } catch (err) {
      console.error(err);
      setError('Failed to proceed with checkout. Please try again later.');
    } finally {
      setLoadingCheckout(false);
    }
  };
   
    const handleNavigation=(productId,productName)=>{
      
    dispatch(setProductData({id:productId}));
    router.push(`/product/${productName}`);
  
    }
      const calculateBill = () => {
        const total = products.reduce((acc, product) => acc + product?.offerPrice*product?.quantity, 0);
        console.log("bill", total);
        return total;
      };
      
    
    console.log(products)
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 lg:px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded shadow-md p-4">
              <ul className="divide-y divide-gray-200">
                {products.map((product, index) => (
                  <CartTile
                    key={index}
                    handleNavigation={handleNavigation}
                    product={isLoggedIn ? product.product : product}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                    onRemoveProduct={handleRemoveProduct}
                    quantity={product?.quantity}
                  />
                ))}
              </ul>
            </div>
            <div className="bg-white rounded shadow-md p-4 sticky top-16">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Price Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Price</p>
                  <p>${isLoggedIn ? totalBill?.toFixed(2) : calculateBill()}</p>
                  </div>
                <div className="flex justify-between text-green-600">
                  <p>Discount</p>
                  <p>- $0.00</p>
                </div>
                <div className="flex justify-between font-semibold">
                  <p>Total Amount</p>
                  <p>${isLoggedIn ? totalBill?.toFixed(2) : calculateBill()}</p>
                </div>
              </div>
              <button
                onClick={isLoggedIn?handleCheckout:()=>{
                  
                  dispatch(setHistory({route:`/cart`}));
                  router.push("/auth");
                
                }}
                className={`w-full mt-4 py-2 rounded text-white ${
                  loadingCheckout ? 'bg-gray-500' : 'bg-gray-800 hover:bg-gray-900'
                }`}
                disabled={products.length === 0 || loadingCheckout}
              >
                {loadingCheckout ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

function CartTile({ handleNavigation,product, onIncreaseQuantity, onDecreaseQuantity, onRemoveProduct, quantity }) {
  const [tileLoading, setTileLoading] = useState(false);

  return (
    <li  className={`flex py-4 m-2 ${tileLoading ? 'border-2 border-double border-x-orange-500 animate-pulse ' : ''}`}>
      <img className="w-16 h-16 rounded object-cover" src={product?.image} alt={product?.name} />
      <div className="ml-4 flex-1">
        <h3 onClick={()=>handleNavigation(product?.id,product?.name)} className="text-gray-800 font-semibold">{product?.name}</h3>
        <p className="text-gray-600 text-sm">
          ${product?.offerPrice?.toFixed(2)}{' '}
          <span className="line-through text-gray-400">${product?.actualPrice?.toFixed(2)}</span>
        </p>
        <p className="text-gray-600 text-sm mt-1">{product?.description}</p>
        <div className="flex items-center mt-2">
          <button
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-l hover:bg-gray-300"
            onClick={() => onDecreaseQuantity(product?.id, setTileLoading)}
            disabled={tileLoading}
          >
            -
          </button>
          <span className="px-4 py-1 bg-gray-100">{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-r hover:bg-gray-300"
            onClick={() => onIncreaseQuantity(product?.id, setTileLoading)}
            disabled={tileLoading}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="ml-auto text-red-500 hover:text-red-600"
        onClick={() => onRemoveProduct(product?.id, setTileLoading)}
        disabled={tileLoading}
      >
        Remove
      </button>
    </li>
  );
}
