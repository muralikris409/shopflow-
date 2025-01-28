import { axiosInstance } from "../api/axios";

export const createOrder = async (userId, items) => {
  try {
    const response = await axiosInstance.post("user/order/createOrder", {
      userId,
      items,
    });
    console.log(response);

    if (response.status !== 201) {
      throw new Error("Error creating order");
    }

    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error in createOrder:", error);
    throw error;
  }
};

export const verifyPayment = async (orderId,razorpayId, paymentId, paymentSignature) => {
    console.log(orderId);
    console.log(paymentId);
    console.log(paymentSignature)
  try {
    const response = await axiosInstance.post("user/order/verify", {
    },
    {
        params:{
            razorpayId,
            orderId,
            paymentId,
            paymentSignature,
        }
    }

);


  

    return response.data; 
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    throw error;
  }
};
export const failedVerify = async (orderId) => {
    console.log("forderid:",orderId)
  try { 
    const response = await axiosInstance.post(`/user/order/failedPayment?orderId=${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw new Error(error?.response?.data?.message || 'Error fetching user orders.');
  }
};