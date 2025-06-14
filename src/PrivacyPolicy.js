import React from "react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#119d77]">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-sm leading-6">
          <p>
            <strong className="font-semibold text-gray-900">
              Personal information we collect:
            </strong>
            <br />
            When you make a purchase or attempt to make a purchase through the
            Site, we collect certain information from you, including your name,
            billing address, shipping address, payment information, email
            address, and phone number. We refer to this information as “Order
            Information”.
          </p>

          <p>
            <strong className="font-semibold text-gray-900">
              How do we use your personal information?
            </strong>
            <br />
            We use the Order Information that we collect generally to fulfill
            any orders placed through the Site (including processing your
            payment information, arranging for shipping, and providing you with
            invoices and/or order confirmations). Additionally, we use this
            Order Information to:
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Communicate with you</li>
            <li>Screen our orders for potential risk or fraud</li>
            <li>
              When in line with your preferences, provide information or
              advertising related to our products or services
            </li>
          </ul>

          <p>
            <strong className="font-semibold text-gray-900">Errors:</strong>
            <br />
            Our professional team always tries to provide updated and accurate
            information on our website. However, sometimes there may be
            incorrect information, pricing, or discounts. We apologize for such
            mistakes; if you place an order in these situations, we reserve the
            right to cancel the order. Please cooperate in these circumstances
            while we review the issue.
          </p>

          <p>
            <strong className="font-semibold text-gray-900">
              Do not track:
            </strong>
            <br />
            Please note that we do not alter our Site’s data collection and use
            practices when we see a "Do Not Track" signal from your browser.
          </p>

          <p>
            <strong className="font-semibold text-gray-900">
              Your rights:
            </strong>
            <br />
            You have the right to access personal information we hold about you
            and to ask that it be corrected, updated, or deleted. If you would
            like to exercise this right, please contact us.
          </p>

          <p>
            <strong className="font-semibold text-gray-900">
              Data retention:
            </strong>
            <br />
            When you place an order through the Site, we will maintain your
            Order Information for our records unless and until you request
            deletion.
          </p>

          <p>
            <strong className="font-semibold text-gray-900">Changes:</strong>
            <br />
            We may update this privacy policy from time to time to reflect
            changes in our practices or for operational, legal, or regulatory
            reasons.
          </p>

          <p>
            <strong className="font-semibold text-gray-900">Contact us:</strong>
            <br />
            For more information about our privacy practices, questions, or
            complaints, contact us via email at
            <a
              href="mailto:support@breakout.com.pk"
              className="text-[#119d77] font-medium ml-1"
            >
              support@breakout.com.pk
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
