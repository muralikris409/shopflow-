import React from "react";
import Link from "next/link";
import {

  FaHeart,

  FaQuestionCircle,
  FaCog,
} from "react-icons/fa";

const VerticalNavBar = () => {
  return (
    <div className="fixed right-0.5 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center">
    
    
      <Link href="/wishlist" className="relative mb-2 p-2 hover:bg-gray-700 rounded group">
        <FaHeart className="text-white w-4 h-4" />
        <span className="absolute right-12 top-1/2 -translate-y-1/2 hidden bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded group-hover:block">
          Wishlist
        </span>
      </Link>
   
     
      {/* <Link href="/help" className="relative mb-2 p-2 hover:bg-gray-700 rounded group">
        <FaQuestionCircle className="text-white w-4 h-4" />
        <span className="absolute right-12 top-1/2 -translate-y-1/2 hidden bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded group-hover:block">
          Help
        </span>
      </Link>
      <Link href="/settings" className="relative p-2 hover:bg-gray-700 rounded group">
        <FaCog className="text-white w-4 h-4" />
        <span className="absolute right-12 top-1/2 -translate-y-1/2 hidden bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded group-hover:block">
          Settings
        </span>
      </Link> */}
    </div>
  );
};

export default VerticalNavBar;
