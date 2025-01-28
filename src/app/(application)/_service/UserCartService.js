"use client";

import { useSelector } from "react-redux";
import { axiosInstance } from "../../api/axios";

function UserCartService() {
  const token = useSelector((state) => state.session.token);

  const cartKey = 'shopflow';

  const getHeaders = () => ({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  this.loadCart = function() {
    const storedCart = localStorage.getItem(cartKey);
    return storedCart ? JSON.parse(storedCart) : [];
  };

  this.saveCart = function(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  };

  this.migrateCart = async function(userId) {
    const guestCart = this.loadCart();
    console.log(guestCart,userId);
    if (guestCart.length > 0) {
      for (const item of guestCart) {
        try {
          console.log(item);
          const res=await this.addItemToCart(userId, item.id, item.quantity);
          console.log("migrated",res)
          
        } catch (error) {
          console.error('Error migrating cart item:', error);
        }
      }
      this.clearCart();
      
    }
  };

  this.addItemToCart = async function(userId, productId, quantity = 1) {
    console.log(userId);
    console.log(productId);
    try {
      const response = await axiosInstance.post(
        // `/user/cart/addItemToCart?userId=${userId}&productId==${userId}4&quantity=${quantity}`, 
        `/user/cart/addItemToCart`,
       {},
        {
          params:{
            
              userId,
              productId,
              quantity
             
          },
          headers: getHeaders()
        }
      );
      

        return response.data;
    
    
    } catch (error) {
      console.log(error)
      console.error('Error adding item to cart:', error);
      throw error.response ? error.response.data : new Error('Network or server error');
    }
  };

  this.viewCart = async function(userId) {
    try {
      const response = await axiosInstance.get('/user/cart/viewCart', {
        params: { userId },
        headers: getHeaders(),
      });

      if (response.status === 200) {
        return response.data.data || [];
      } else {
        throw new Error(response.data.message || 'Failed to retrieve cart');
      }
    } catch (error) {
      console.error('Error viewing cart:', error);
      throw error.response ? error.response.data : new Error('Network or server error');
    }
  };

  this.deleteFromCart = async function(userId, productId) {
    try {
      const response = await axiosInstance.delete('/user/cart/deleteFromCart', {
        params: { userId, productId },
        headers: getHeaders(),
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to delete item from cart');
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      throw error.response ? error.response.data : new Error('Network or server error');
    }
  };

  this.updateCartCount = async function(userId, productId, operation) {
    try {
      const response = await axiosInstance.put('/user/cart/cartCount', {}, {
        params: { userId, productId, operation },
        headers: getHeaders(),
      });
      console.log(response.status)
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data || 'Failed to update cart count');
      }
    } catch (error) {
      console.error('Error updating cart count:', error);
      throw error;
    }
  };

  this.clearCart = function() {
    localStorage.removeItem(cartKey);
  };
}

export default UserCartService;
