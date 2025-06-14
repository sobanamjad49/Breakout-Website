import React from "react";

function CancellationPolicy() {
  return (
    <div className="bg-white text-gray-800 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#119d77]">
          Cancellation Policy
        </h1>
        <ul className="list-disc list-inside space-y-2 text-sm font-semibold text-left">
          <li>
            You have the right to cancel the order before 5 hours of checkout.
          </li>
          <li>
            If you want to update a paid order, you must use the same contact
            number and email ID when reaching out to us.
          </li>
          <li>
            Once the order has been processed you will receive an email with
            tracking number, after which the order cannot be cancelled. However,
            exchange policy will be applicable.
          </li>
          <li>
            Breakout has the right to cancel the order for the following
            reasons:
          </li>
          <ol className="list-decimal list-inside ml-5 space-y-2 text-sm font-semibold">
            <li>Items are out of stock.</li>
            <li>There is a price mistake of the product.</li>
            <li>
              Credit card payment is declined by the financial institution.
            </li>
          </ol>
        </ul>
      </div>
    </div>
  );
}

export default CancellationPolicy;
