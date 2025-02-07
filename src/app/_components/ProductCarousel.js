import Link from "next/link";
import React from "react";

const ProductCarousel = ({ title, children,href }) => {
  return (
    <div className="mb-4 bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <Link href={href} className="text-orange-500 hover:underline text-sm font-medium">
          View More
        </Link>
      </div>

      <div className="flex overflow-x-auto  scrollbar-hide scrollbar-thumb-orange-500 scrollbar-track-gray-200">
      {children && Array.isArray(children)
  ? children.map((child, index) => (
      <div key={index} className="mx-1 flex-shrink-0 w-64">
        {child}
      </div>
    ))
  : children}
      </div>
    </div>
  );
};

export default ProductCarousel;
