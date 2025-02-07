"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { setProductData } from "../_lib/utilReducer";

const ProductCard = ({ product}) => {
  const dispatch=useDispatch();
  const router=useRouter();

  const handleNavigation=()=>{
    
  router.push(`/product/${product.id}`);

  }
  return (
    // <Link
    //   href={{
    //     pathname: `product/${product.name}`,
    //     query: { id: product.id },
    //   }}
    //   // as={`products/${product.name}`}
    //   passHref
    // >
    <div onClick={handleNavigation}>
      <div className="relative max-h-30 m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
          <img
            className="object-cover w-full"
            src={product?.image || "/_assets/image.png"}
            alt={product?.name || "Placeholder Image"}
          />
          {product.discountPercentage && (
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>
        <div className="mt-1 px-5 pb-5">
          <h5 className="text-xl tracking-tight text-slate-900">
            {product.name || "Unnamed Product"}
          </h5>
          <div className="mt-1 flex items-center justify-between">
            <p>
              {product.actualPrice ? (
                <>
                  <span className="text-xl font-bold text-slate-900">
                    ${product.offerPrice}
                  </span>
                  {product.actualPrice && (
                    <span className="text-sm ml-1 text-slate-900 line-through">
                      ${product.actualPrice}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-gray-500">Price not available</span>
              )}
            </p>
          </div>
          <div className="flex items-center mb-2">
            {product.rating ? (
              Array.from({ length: product.rating }).map((_, index) => (
                <svg
                  key={index}
                  aria-hidden="true"
                  className={`h-4 w-4 ${
                    index < product.rating ? "text-yellow-300" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))
            ) : (
              <span className="text-gray-500">No ratings yet</span>
            )}
            {product.rating && (
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                {product.rating}
              </span>
            )}
          </div>
        
        </div>
      </div>
    {/* // </Link> */}
    </div>
  );
};

export default ProductCard;
