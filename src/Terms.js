import React from "react";

function TermsOfService() {
  return (
    <div className=" bg-white text-gray-800 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#119d77]">
          Terms of Service
        </h1>
        <ul className="list-disc text-sm font-semibold text-left mt-10 mb-8 ">
          <li>Breakout cannot guarantee product availability.</li>
          <li>
            If a product is listed at an incorrect price or with incorrect
            information, we shall have the right to cancel the order.
          </li>
          <li>
            Photographs, products, artworks, designs, text, graphics, logos and
            buttons are owned by Breakout and are protected by copyright laws.
          </li>
          <li>
            The content of the website is intended solely for your personal use.
          </li>
          <li>
            Your personal information is confidential. We do not trade email
            addresses.
          </li>
          <li>
            Colors of the product may vary slightly from pictures used on the
            website.
          </li>
          <li>All product prices are inclusive of GST tax.</li>
        </ul>
      </div>
    </div>
  );
}

export default TermsOfService;
