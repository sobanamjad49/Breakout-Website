import React from "react";

function ExchangeAndReturn() {
  return (
    <div className="bg-white text-gray-800 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#119d77]">
          Exchange & Return
        </h1>
        <ul className="list-disc text-sm font-semibold text-left mt-10 mb-8 space-y-3">
          <li>
            Exchange within 7 days subject to stock availability and proof of
            purchase.
          </li>
          <li>No refunds and no returns.</li>
          <li>
            For exchange (return within 7 days of purchase) please email us at{" "}
            <a
              href="mailto:support@breakout.com.pk"
              className="text-[#119d77] underline"
            >
              support@breakout.com.pk
            </a>{" "}
            or call +92-311-1100439 during working days (Monday to Saturday)
            from 10am to 5pm.
          </li>
          <li>Exchange and refund is not offered for international orders.</li>
          <li>The claim of accessories is not acceptable.</li>
          <li>
            Online orders cannot be exchanged at any Breakout and Breakout Kids
            stores.
          </li>
          <li>Washed, used or damaged garments would not be exchanged.</li>
          <li>
            Product purchased on ‘sale’ can only be exchanged in different size,
            depending on the size availability.
          </li>
          <li>
            In case of lost shipment, customer must inform via email{" "}
            <a
              href="mailto:support@breakout.com.pk"
              className="text-[#119d77] underline"
            >
              support@breakout.com.pk
            </a>{" "}
            with the complete order details. We will set an inquiry regarding
            your claim. If after inquiry, it is confirmed that your claim is
            valid, then the product will be shipped again.
          </li>
          <li>Exchanging items shipping cost will be charged to customer.</li>
        </ul>
      </div>
    </div>
  );
}

export default ExchangeAndReturn;
