import axios from "axios"
export const axiosInstance=axios.create({
    // baseURL:"http://192.168.0.114:5000"
    // baseURL:"http://localhost:5000"
    //  baseURL:"https://shopflow-1.onrender.com"
    baseURL:process.env.NEXT_PUBLIC_API_URL
    // baseURL:"http://192.168.126.35:5000"

}
) 