import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="flex justify-center items-center space-x-2 animate-pulse">
          <img
          src="/_assets/loading.png"
            // src="https://img.icons8.com/ios/452/shopping-cart.png"
            alt="loading"
            className="h-14 w-14 text-white text-bold"
          />
          <div className="text-3xl text-white font-semibold">Loading...</div>
        </div>

        <div className="text-lg text-white text-center font-light">
          "Your shopping experience is just a moment away!"
        </div>

      </div>
    </div>
  );
};

export default Loading;
