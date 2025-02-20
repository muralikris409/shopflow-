import { axiosInstance as axios, axiosInstance } from "../api/axios";

import { setCookie } from 'nookies';

export async function login(formdata, ctx = null) {
    const { email, password } = formdata;

    try {
        const response = await axios.post("user/login", {
            email: email,
            password: password
        });
       console.log(response.data)
        const { token, data } = response.data;
        console.log(token,data)
        setCookie(ctx, "shopflow_session", JSON.stringify({token }), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
            sameSite: 'lax',
        });

        return { data, token };
    } catch (error) {
      console.log(error);
        throw new Error(error.response.data.message || "An error occurred during login.");
    }
}


export async function OAuth() {
  try { 
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/user/google`;
  } catch (error) {
    console.log(JSON.stringify(error));
      throw new Error(error?.data?.response?.message || "An error occurred during Google OAuth.");
  }
}



export async function signUp(formdata) {
    const { username: name, email, password } = formdata;

    try {
        const response = await axios.post("user/signup", {
            name,
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
       
            throw new Error(error.response.data.message || "An error occurred during sign-up.");
        
    }
}



export async function forgotPassword(email) {
  try {
    const response = await axiosInstance.post(`user/forgotPassword?email=${email}`);
    console.log(response)
    if (response.status === 200) {
      return {
        ok: true,
        data: response.data,
      };
    }
    return {
      ok: false,
      message: response.data?.message || "Something went wrong.",
    };
  } catch (err) {
    console.log(err)
    throw err;
  }
}
export async function resetPassword(token,password){
    try{
    const response=await axiosInstance.post(`user/resetPassword?token=${token}&newPassword=${password}`);
        return response;
   
}
catch(err){
    throw err;
}
}
export async function getProfileInfo(token,userId){
    try{
        console.log("test")
    const response=await axiosInstance.get(`user/userProfileInfo?userId=${userId}`,{},{
        // headers:{
        //     Authorization:`Bearer ${token}`
        // }
    });
    console.log(response);
        return response;
   
}
catch(err){
    console.log(err);
}
}
export async function updateProfileInfo(token,userId,data){
    try{
        console.log("test")
    const response=await axiosInstance.put(`user/updateUserProfile?userId=${userId}`,
        data
        

    ,{
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type': 'multipart/form-data',

        }
    });
    console.log(response);
        return response;
    
   
}
catch(err){
    console.log(err);
    throw err;   
}
}


export async function fetchUserAddresses (token,userId){
    
  try {
console.log("token",token);

    const response = await axiosInstance.get(`user/getAllAddress?userId=${userId}`, {
      
      headers:{
        Authorization:`Bearer ${token}`
    }
    });
    console.log(response)
    return response.data; 
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return { error: error.message || "Something went wrong!" };
  }
};
export const makeAddressPrimary = async (token,userId,addressId) => {
    try {
      const response = await axiosInstance.put(`user/makePrimaryAddress`,{}, {
        params: { userId,addressId },
        headers:{
          Authorization:`Bearer ${token}`
      }
      });
      console.log(response)
      return response.data; 
    } catch (error) {
      console.error("Error fetching addresses:", error);
      return { error: error.message || "Something went wrong!" };
    }
  };

export const addAddress = async (token, userId, addressData) => {
  try {
    const { street, city, state, country, zip, isPrimary } = addressData;

    const response = await axiosInstance.post(
      'user/addAddress',
      {},
      {
        params: {
          userId,
          street,
          city,
          state,
          country,
          zip,
          isPrimary,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
   
    return response.data; 
  } catch (error) {
    console.error("Error adding address:", error);
    return { error: error.response?.data?.message || "Something went wrong!" };
  }
};
export const updateAddress = async (token, userId, addressId,addressData) => {
    try {
      const { street, city, state, country, zip, isPrimary } = addressData;
  
      const response = await axiosInstance.put(
        'user/editAddress',
        {

        },
        {
            
          params: {
            userId,
            addressId,
            street,
            city,
            state,
            country,
            zip,
            isPrimary,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      return response.data; 
    } catch (error) {
      console.error("Error adding address:", error);
      return { error: error.response?.data?.message || "Something went wrong!" };
    }
  };
  export const removeAddress = async (token, userId, addressId) => {
    try {
  
      const response = await axiosInstance.delete(
        'user/deleteAddress',
        
        {
          params: {
            userId,
            addressId
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      return response.data; 
    } catch (error) {
      console.error("Error adding address:", error);
      return { error: error.response?.data?.message || "Something went wrong!" };
    }
  };