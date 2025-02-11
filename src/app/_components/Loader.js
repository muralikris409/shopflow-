import React from "react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="relative  flex items-center justify-center bg-white rounded-full shadow-2xl">
        <div className="absolute w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        
        <img
          src="/_assets/loader.gif"
          alt="Loading..."
          className="w-24 h-24 drop-shadow-lg"
        />
      </div>
    </div>
  );
};
