import React from "react";

function TrackYourOrder() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src="https://s3-ap-south-1.amazonaws.com/elasticbeanstalk-ap-south-1-607085342777/resources/logo/324705691-309048268_641302380984331_381300464182542427_n.jpg"
            alt="Logo"
          />
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
          Track Your Order
        </h2>

        <form className="space-y-4">
          <input
            required
            type="text"
            placeholder="Order Number (#xxxxx)"
            className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-[#119d77] placeholder-gray-600"
          />

          <input
            required
            type="text"
            placeholder="Phone or Email"
            className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-[#119d77] placeholder-gray-600"
          />

          <button
            type="submit"
            className="w-full bg-[#119d77] text-white py-2 px-4 rounded hover:bg-[#0d7a5d] transition-colors"
          >
            Track My Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default TrackYourOrder;
