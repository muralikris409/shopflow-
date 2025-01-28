import React from 'react';

const SubcategoryCard = ({ subcategory }) => {
  return (
    <div className="my-4">
      <div className="relative flex w-60 items-center overflow-hidden rounded-lg bg-white p-4 shadow hover:shadow-md transition-transform transform hover:scale-105">
        <div className="shrink-0 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
          <img
            src={subcategory.image || "/_assets/image.png"}
            alt={subcategory.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="font-medium text-gray-800">{subcategory.name}</p>
          <p className="text-sm text-gray-600">{subcategory.description || "No description available"}</p>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryCard;
