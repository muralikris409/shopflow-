import {axiosInstance} from '../api/axios';

export const createOrder = async ( items) => {
  try {
    const response = await axiosInstance.post('/user/order/createOrder', { items });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error(error?.response?.data?.message || 'Error creating order.');
  }
};
export const fetchOrderForCheckout = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/user/order/getOrderForCheckout/?orderId=${orderId}`); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching order for checkout:", error);
    return {
      status: "error",
      message: error.response?.data?.message || "An error occurred while fetching the order.",
    };
  }
};
export const verifyPaymentAndUpdateOrder = async (orderId,razorpayId, paymentId, paymentSignature) => {
    console.log("order_id:",orderId);
    console.log("razorpayId:",razorpayId);
    console.log("paymentId:",paymentId);
    console.log("siign:",paymentSignature);
  try {
    const response = await axiosInstance.post('/user/order/verify', {}
    ,
    {
        params:{
            orderId,
            razorpayId,
            paymentId,
            paymentSignature,
        }
    }
    
);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw new Error(error?.response?.data?.message || 'Error verifying payment.');
  }
};

export const checkOutOrder = async (orderId) => {
    console.log("orderid:",orderId)
  try { 
    const response = await axiosInstance.post(`/user/order/checkoutOrder?orderId=${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw new Error(error?.response?.data?.message || 'Error fetching user orders.');
  }
};
export const getOrderByUserId = async () => {
   
    try {
      const response = await axiosInstance.get(`/user/order/getUserOrder`
       
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw new Error(error?.response?.data?.message || 'Error fetching user orders.');
    }
  };
export const cancelOrder = async (orderId) => {
    console.log(orderId);
  try {
    const response = await axiosInstance.put(`/user/order/cancelOrder?orderId=${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw new Error(error?.response?.data?.message || 'Error cancelling order.');
  }
};
export const getOrderById = async (orderId) => {
  console.log("userId:", orderId);
  try {
    const response = await axiosInstance.get(`/user/order/getOrderById?orderId=${orderId}`
     
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw new Error(error?.response?.data?.message || 'Error fetching user orders.');
  }
};