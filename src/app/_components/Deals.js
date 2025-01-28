import React from "react";
import DealsWrapper from "./DealsWrapper";

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
    <section className="mt-5 flex justify-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/3 bg-blue-100 py-10">

      <div className="w-full max-w-screen-md px-4 py-4">
      <h1 className="text-center text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-gray-800 to-black md:text-3xl">
  {title}
</h1>



        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 max-h-96 overflow-y-auto scrollbar-hide">
          {products?.length > 0 ? (
            products.slice(0, 6).map((product, index) => (
              <DealsWrapper key={index} product={product}>
                <article className="relative overflow-hidden rounded-lg shadow-md transition-transform transform hover:scale-105 group">
                  {/* Offer Percentage Badge */}
                  {product.discountPercentage && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                  <img
                    className="h-40 w-full object-cover rounded-t-lg"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <h2 className="text-base font-bold text-gray-800 text-center">
                        {product.name}
                      </h2>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center text-yellow-500 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 ${
                                i < product.rating ? "fill-current" : "text-gray-300"
                              }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927a1 1 0 011.902 0l1.44 4.434a1 1 0 00.95.69h4.639a1 1 0 01.592 1.81l-3.758 2.725a1 1 0 00-.364 1.118l1.44 4.434a1 1 0 01-1.54 1.118L10 14.347l-3.758 2.726a1 1 0 01-1.54-1.118l1.44-4.434a1 1 0 00-.364-1.118L2.73 9.861a1 1 0 01.592-1.81h4.639a1 1 0 00.95-.69L9.049 2.927z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-xs text-center text-gray-600">
                            {product.rating || "N/A"}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-lg font-semibold text-center text-green-600">
                        ${product.offerPrice}
                        <span className="text-sm line-through text-gray-500 ml-2">
                          ${product.actualPrice}
                        </span>
                      </p>
                    </div>
                  </div>
                </article>
              </DealsWrapper>
            ))
          ) : (
            <div className="p-4 text-gray-500 text-center">No deals available</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Deals;
