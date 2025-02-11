import React from "react";
import DealsWrapper from "./DealsWrapper";
import ProductCard from "./ProductCard";

async function Deals({ fetchData, title }) {
  let products = [];
  let error = "";
  try {
    products = await fetchData();
  } catch (err) {
    error = err;
  }
  products = products.data;

  return (
    <section className="mt-5 flex justify-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/3 bg-gray-100 py-10 rounded-lg shadow-lg">
      <div className="w-full max-w-screen-md px-6 py-4">
        <h1 className="text-center text-3xl font-bold text-blue-600">
          {title}
        </h1>
        <div className="mt-6 max-h-96 overflow-y-auto scrollbar-hide px-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {products?.length > 0 ? (
              products.slice(0, 6).map((product, index) => (
                <DealsWrapper key={index} product={product}>
                  <ProductCard product={product} />
                </DealsWrapper>
              ))
            ) : (
              <p className="p-4 text-gray-500 text-center">No deals available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Deals;
