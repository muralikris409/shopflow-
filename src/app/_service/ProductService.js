import React from 'react';
import { axiosInstance as axios } from '../api/axios';

export const getFilteredProducts = async (filters) => {
    console.log(filters);
    try {
        const response = await axios.get('/products/filteredProducts', {
            params: {
                categoryName: filters?.selectedCategory,
                subCategoryNames: filters?.selectedSubcategories,
                sort: filters?.sortOption,
            },
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching filtered products:", err.message);
        throw new Error("Unable to fetch filtered products. Please try again later.");
    }
};

export async function subCategoryProducts(id) {
    try {
        const response = await axios.get("/products/getProductsByCategory", {
            params: { subCategoryId: id },
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error("Error fetching products by subcategory:", err.message);
        
        throw new Error("Unable to fetch products for the selected subcategory. Please try again later.");
    }
}

export async function getProducts(page = 1) {
    try {
        const response = await axios.get("/products/getAllProducts", {
            params: { page: page },
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching products:", err.message);
        throw new Error("Unable to fetch products. Please try again later.");
    }
}

export  async function getFlashDeals() {
    try {
        const flashdeal = await axios.get("/products/flashDealProducts");
        return flashdeal.data;
    } catch (err) {
        console.error("Error fetching flash deals:", err.message);
        throw new Error("Unable to fetch flash deals. Please try again later.");
    }
}
export  async function getTrendingProducts() {
    try {
        const trending = await axios.get("/products/getTrendingProducts");
        return trending.data;
    } catch (err) {
        console.error("Error fetching flash deals:", err.message);
        throw new Error("Unable to fetch flash deals. Please try again later.");
    }
}
export  async function getNewArrivals() {
    try {
        const newarrival = await axios.get("/products/getNewArrivals");
        return newarrival.data;
    } catch (err) {
        console.error("Error fetching flash deals:", err.message);
        throw new Error("Unable to fetch flash deals. Please try again later.");
    }
}
export  async function getLimitedTimeOffers() {
    try {
        const limiteddeal = await axios.get("/products/getLimitedTimeOffers");
        return limiteddeal.data;
    } catch (err) {
        console.error("Error fetching flash deals:", err.message);
        throw new Error("Unable to fetch flash deals. Please try again later.");
    }
}
export  async function getClearanceSaleProducts() {
    try {
        const clearanceSale = await axios.get("/products/getClearanceSaleProducts");
        return clearanceSale.data;
    } catch (err) {
        console.error("Error fetching flash deals:", err.message);
        throw new Error("Unable to fetch flash deals. Please try again later.");
    }
}
export async function getCategory() {
    try {
        const categories = await axios.get("/products/Category");
        console.log(categories.data);
        return categories.data;
    } catch (err) {
        console.error("Error fetching categories:", err.message);
        throw new Error("Unable to fetch categories. Please try again later.");
    }
}

export async function getProductByID(id) {
    try {
        const product = await axios.get("/products/getProductById", {
            params: { productId: id },
        });
        return product.data;
    } catch (err) {
        console.error("Error fetching product by ID:", err.message);
        throw new Error("Unable to fetch product details. Please try again later.");
    }
}

export async function getSearchedProduct(query) {
    try {
        const products = await axios.get("/products/getProductBySearch", {
            params: { query: query },
        });
        return products.data;
    } catch (err) {
        console.error("Error fetching searched products:", err.message);
        throw new Error("Unable to search for products. Please try again later.");
    }
}
