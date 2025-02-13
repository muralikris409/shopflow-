
"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../_components/ProductCard";
import { getFilteredProducts, getProducts, getSearchedProduct } from "../../_service/ProductService";
import Pagination from "../../_components/Pagination"; 
import { Loader } from "@/app/_components/Loader";

export default function Products(props) {
  const { filter, search } = useSelector((state) => state.generic.data);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  console.log(totalPages);
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true); 
      try {
        let response;
        if (search) {
          response = await getSearchedProduct(search);
        } else if (filter) {
          response = await getFilteredProducts(filter);
        } else {
          response = await getProducts(currentPage);
        }
      
        setProducts(response.data);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchFilteredProducts();
  }, [filter, search, currentPage]);

  return (
    <div className="m-2 max-w-screen   max-h-screen  overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <div className="w-full overflow-hidden bg-white  grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Failed to load products. Please try again later.</p>
        ) : products?.length > 0 ? (
          products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )
        }
      </div>
      <div className="flex justify-center mt-4">
        {totalPages>1&&<Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={(page) => setCurrentPage(page)} 
        />}
      </div>
    </div>
  );
}


