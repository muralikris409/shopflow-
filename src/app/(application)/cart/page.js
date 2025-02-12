'use client';

import React, { useState, useEffect } from 'react';
import {
  getTotalAmount,
  decreaseQuantity as guestDecreaseQuantity,
  getCart as guestGetCart,
  increaseQuantity as guestIncreaseQuantity,
  removeProduct as guestRemoveProduct,
} from '../../_service/GuestCartService';
import UserCartService from '../../_service/UserCartService';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createOrder } from '../../_service/OrderService';
import { setHistory } from '../../_lib/utilReducer';
import { fetchData } from '../../_lib/cartReducer';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const dispatch = useDispatch();
  const userCartService = new UserCartService();
  const isLoggedIn = useSelector((state) => state.userData?.user);
  const router = useRouter();
  const cartItems=useSelector(state=>state.cart.items);
  const totalBill=useSelector(state=>state.cart.totalAmount);
  const [products, setProducts] = useState(isLoggedIn?  cartItems:[]); 
  const [totalAmount, setTotalAmount] = useState(totalBill||0);
  const error = useSelector((state) => state.cart.error);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const { toast } = useToast();
  console.log(totalBill);
  
  useEffect(() => {
    setProducts(cartItems);
    setTotalAmount(totalBill);
  }, [cartItems]);
  useEffect(() => {
    const loadCart = async () => {
      if (isLoggedIn) {
        dispatch(fetchData(`/user/cart/viewCart`));
        
      } else {
        if (typeof window !== 'undefined') {
          setProducts(guestGetCart());
          setTotalAmount(getTotalAmount());
        }
      }
    };
    loadCart();
  }, [isLoggedIn, dispatch]);

  const handleNavigation = (productId) => {
    router.push(`/product/${productId}`);
  };

  const handleCheckout = async () => {
    setLoadingCheckout(true);
    try {
      const items = products.map((product) => ({
        productId: product.productId || product.id,
        quantity: product.quantity,
      }));
      const { data } = await createOrder(items);
      router.push(`/checkout/${data?.id}`);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to create order. Please try again.', variant: 'destructive' });
    } finally {
      setLoadingCheckout(false);
    }
  };

  const updateCart = async (productId, action) => {
    try {
      if (isLoggedIn) {
        await userCartService.updateCartCount(productId, action);
        dispatch(fetchData(`/user/cart/viewCart`));
      } else {
        if (typeof window !== 'undefined') {
          action === 'increase' ? guestIncreaseQuantity(productId) : guestDecreaseQuantity(productId);
          setProducts(guestGetCart());
          setTotalAmount(getTotalAmount());
        }
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to update item quantity.', variant: 'destructive' });
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      if (isLoggedIn) {
        await userCartService.deleteFromCart(productId);
        dispatch(fetchData(`/user/cart/viewCart`));
      } else {
        if (typeof window !== 'undefined') {
          guestRemoveProduct(productId);
          setProducts(guestGetCart());
          setTotalAmount(getTotalAmount());
        }
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to remove product from cart.', variant: 'destructive' });
    }
  };

  return (
    <div className="w-full h-screen mx-auto p-2 md:p-4 bg-white rounded-lg shadow-md">
      <div className="container mx-auto px-1">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Shopping Cart</h2>
        {error ? (
          <p className="text-center text-red-500">{error.message}</p>
        ) : products?.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-4">
                  <ul className="space-y-4">
                    {products.map((product, index) => (
                      <CartTile
                        key={index}
                        handleNavigation={handleNavigation}
                        product={isLoggedIn ? product.product : product}
                        onIncreaseQuantity={() => updateCart(product.productId || product.id, 'increase')}
                        onDecreaseQuantity={() => updateCart(product.productId || product.id, 'decrease')}
                        onRemoveProduct={() => handleRemoveProduct(product.productId || product.id)}
                        quantity={product?.quantity}
                      />
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-16">
                <CardHeader>
                  <CardTitle className="text-lg">Price Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <p>Price</p>
                    <p>${totalAmount.toFixed(2)}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <p>Total Amount</p>
                    <p>${totalAmount.toFixed(2)}</p>
                  </div>
                  <Button
                    onClick={isLoggedIn ? handleCheckout : () => {
                      dispatch(setHistory({ route: `/cart` }));
                      router.push('/auth');
                    }}
                    className="w-full"
                    disabled={products?.length === 0 || loadingCheckout}
                  >
                    {loadingCheckout ? 'Processing...' : 'Checkout'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

function CartTile({
  handleNavigation,
  product,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveProduct,
  quantity,
}) {
  const [tileLoading, setTileLoading] = useState(false);
  const { toast } = useToast();

  const handleOperation = async (operation, productId) => {
    setTileLoading(true);
    try {
      await operation(productId);
    } catch (err) {
      toast({ title: 'Error', description: 'Operation failed. Please try again.', variant: 'destructive' });
    } finally {
      setTileLoading(false);
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${
        tileLoading ? 'animate-pulse' : ''
      }`}
    >
      <div className="flex flex-col md:flex-row p-4 gap-4">
        {/* Product Image */}
        <img
          className="w-full md:w-24 h-24 rounded-lg object-cover"
          src={product?.image}
          alt={product?.name}
        />

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3
              onClick={() => handleNavigation(product?.id)}
              className="text-lg font-semibold text-gray-900 hover:underline cursor-pointer"
            >
              {product?.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              ${product?.offerPrice?.toFixed(2)}{' '}
              <span className="line-through text-gray-400">
                ${product?.actualPrice?.toFixed(2)}
              </span>
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOperation(onDecreaseQuantity, product?.id)}
              disabled={tileLoading || quantity == 1}
            >
              -
            </Button>
            <Input
              className="w-12 text-center"
              type="text"
              value={quantity}
              readOnly
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOperation(onIncreaseQuantity, product?.id)}
              disabled={tileLoading}
            >
              +
            </Button>
          </div>
        </div>

        {/* Remove Product Button */}
        <Button
          size="sm"
          onClick={() => handleOperation(onRemoveProduct, product?.id)}
          disabled={tileLoading}
          className="self-start md:self-center bg-red-500"
        >
          <Trash2 className="w-4 h-4 text-white" />
        </Button>
      </div>
    </div>
  );
}