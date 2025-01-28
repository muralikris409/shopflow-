import React, { useState } from "react";
import Link from "next/link";
const Navbar = ({ menuData=[] }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  
  return (
    <div className="bg-gray-900 text-white relative h-10">
      <div className="flex items-center justify-between w-3/5 sm:px-3 lg:px-6  py-4">
        <div
          className="relative"
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <button className="flex items-center space-x-2 bg-gray-800 rounded-t-md px-1">
            <span className="text-sm font-semibold uppercase">Categories</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isDropdownVisible && (
            
            <div className="absolute top-full left-0 bg-white text-black shadow-lg w-40 z-50">
              {menuData?.map((category, index) => (
                <div
                  key={category.id}
                  onMouseEnter={() => setActiveCategory(index)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className="relative group"
                >
                  <div className="p-2 cursor-pointer text-sm font-semibold hover:text-gray-600">
                    {category.name} {/* Access category name */}
                  </div>

                  {activeCategory === index && (
                    <div
                      className="absolute top-0 left-full bg-white text-black shadow-lg w-40 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                    >
                      <ul className="p-4 space-y-2">
                        {category.subCategories?.map((item) => (  
                          
                          <Link href={`/products/subcategory/${item.id}`} key={item.id}>
                            <li
                            key={item.id}
                            className="text-sm hover:text-gray-600 cursor-pointer"
                          >
                            {item.name} 
                          </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* <div className="flex items-center space-x-4  text-sm">
          <button className="hover:text-yellow-500">Flash Deals</button>
          <button className="hover:text-yellow-500">Discover New</button>
          <button className="hover:text-yellow-500">Clearance Sale</button>
          <button className="hover:text-yellow-500">Top Sellers</button>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
