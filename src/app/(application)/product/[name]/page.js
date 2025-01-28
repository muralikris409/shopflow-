"use client";
import React, { useEffect, useState } from "react";
import { getProductByID } from "@/app/(application)/_service/ProductService";
import ProductView from "./ProductView";
import { useSelector } from "react-redux";
import Cookies from "js-cookie"; // Import the js-cookie library

export default function Page() {
  const pId = useSelector((state) => state?.utils?.product?.id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pId) {
      Cookies.set("persistedData", JSON.stringify({ product: { id: pId } }), {
        expires: 7,
      });
    }
  }, [pId]);

  const persistedData = Cookies.get("persistedData");
  const id = persistedData ? JSON.parse(persistedData)?.product?.id : null;

  useEffect(() => {
    if (id) {
      async function loadProduct() {
        try {
          const product = await getProductByID(id);
          setProduct(product.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
      loadProduct();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductView product={product} />;
}
