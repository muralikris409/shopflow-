import { axiosInstance as axios } from "../api/axios";
export const fetchCarousel = async () => {
    try {
        const response = await axios.get('/products/getCarousel');
        return response.data;
    } catch (err) {
        console.error("Error fetching filtered products:", err.message);
        throw new Error("Unable to fetch filtered products. Please try again later.");
    }
};