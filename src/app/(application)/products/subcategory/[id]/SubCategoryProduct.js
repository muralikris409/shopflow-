"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { subCategoryProducts, getFilteredProducts } from "@/app/_service/ProductService";
import Link from "next/link";
import ProductCard from "@/app/_components/ProductCard";

export default function Products({ id }) {
  const filter = useSelector((state) => state.generic.data.filter);
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        let response;
        if (filter && filter.selectedCategory) {
          response = await getFilteredProducts(filter);
        } else {
          response = await subCategoryProducts(id);
        }

        setSubcategories(response.data);
      } catch (err) {
        console.log(JSON.stringify(err));
        setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchFilteredProducts();
  }, [filter, id]);

  return (
    <Link href={""} className="container max-h-screen overflow-x-hidden overflow-y-scroll scrollbar-hide">
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : subcategories?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {subcategories.map((subcategory) => (
           <Link key={subcategory.id} href={`/product/${subcategory.id}`}>
                  <ProductCard product={subcategory} />  
           </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No subcategories available</p>
      )}
    </Link>
  );
}
