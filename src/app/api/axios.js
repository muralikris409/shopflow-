
import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
//   baseURL: "http://192.168.242.35:5000", 
  // baseURL: "http://192.168.0.114:5000",
  baseURL: process.env.NEXT_PUBLIC_API_URL,



});

axiosInstance.interceptors.request.use(
    (config) => {
      const session = Cookies.get("shopflow_session");
      
      if (!session) return config;
  
      const token = JSON.parse(session)?.token;
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );