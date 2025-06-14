import React from "react";

function RefundPolicy() {
  return (
    <div>
      <div className="bg-white text-gray-800 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#119d77]">
            Refund Policy
          </h1>
          <ul className="list-disc text-sm font-semibold text-left mt-10 mb-8 space-y-2">
            <li>
              No return — only size and color can be exchanged, subject to
              availability.
            </li>
            <li>
              The product will only be exchanged if the product received has any
              defect. Contact customer service by emailing pictures of the
              defective product at
              <span className="text-blue-600 underline ml-1">
                support@breakout.com.pk
              </span>{" "}
              or call at{" "}
              <span className="text-blue-600 font-medium">0311-1100439</span>{" "}
              within 15 days.
            </li>
            <li>
              To return your product, mail your product to Retail Concept.
            </li>
            <li>
              Exchange and refund are not offered for international orders.
            </li>
            <li>
              Online ordered products cannot be exchanged at any Breakout store.
            </li>
            <li>Washed, used, or damaged outfits will not be exchanged.</li>
            <li>
              Product purchased on sale can only be exchanged in a different
              size, depending on availability.
            </li>
            <li>
              In case of a lost shipment, inform us via email with complete
              order details. We will investigate your claim. If confirmed valid,
              the product will be replaced.
            </li>
            <li>Returning items will be returned at the customer’s cost.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;
