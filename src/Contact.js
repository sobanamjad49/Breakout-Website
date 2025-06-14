import React from "react";

function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        Contact Us
      </h2>

      <form className="w-full max-w-md space-y-6">
        {/* Full Name Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#119d77] placeholder-gray-500 py-2 bg-transparent"
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <input
            type="email"
            placeholder="Email*"
            className="w-full border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#119d77] placeholder-gray-500 py-2 bg-transparent"
          />
        </div>

        {/* Message Input */}
        <div className="relative">
          <textarea
            placeholder="Message*"
            rows="4"
            className="w-full border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#119d77] placeholder-gray-500 py-2 bg-transparent resize-none"
          ></textarea>
        </div>

        {/* Optional Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="mt-4 bg-[#119d77] text-white px-6 py-2 rounded-full hover:bg-[#0d7e5e] transition duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
