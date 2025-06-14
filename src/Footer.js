import React, { useState } from "react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "We are BREAKOUT",
      answer: [
        <Link to="/About" key="about" className="text-sm">
          About
        </Link>,
        <Link to="/Contact" key="contact" className="text-sm">
          Contact us
        </Link>,
        <Link to="/Terms" key="terms" className="text-sm">
          Terms of Service
        </Link>,
        <Link to="/RefundPolicy" key="refund" className="text-sm">
          Refund policy
        </Link>,
      ],
    },
    {
      question: "Support",
      answer: [
        <Link to="/TrackYourOrder" key="track" className="text-sm">
          Track your order
        </Link>,
        <Link to="/PrivacyPolicy" key="privacy" className="text-sm">
          Privacy policy
        </Link>,
        <Link to="/Terms" key="terms2" className="text-sm">
          Terms & conditions
        </Link>,
        <Link to="/ExchangeAndReturn" key="exchange" className="text-sm">
          Exchange & Return
        </Link>,
        <Link to="/CancellationPolicy" key="cancel" className="text-sm">
          Cancellation policy
        </Link>,
      ],
    },
  ];

  return (
    <footer className="w-full">
      {/* Desktop and larger screens */}
      <div className="hidden sm:block w-full">
        <div className="container-fluid">
          <div className="row bg-black pb-5">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-white text-left ml-5 font-normal mt-4">
                  Newsletter
                </p>
                <p className="text-white ml-5 text-left text-sm font-normal mt-2">
                  Sign up for exclusive updates, new arrivals & insider only
                  discounts
                </p>
                <div className="bg-black p-6 flex space-x-6">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-500 text-2xl transition"
                  >
                    <FaFacebookF />
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-600 text-2xl transition"
                  >
                    <FaYoutube />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-pink-500 text-2xl transition"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>

              <div>
                <p className="font-bold text-white text-left ml-14 mt-4">
                  We are BREAKOUT
                </p>
                <ol className="font-normal text-sm text-white text-left ml-14">
                  <Link to="/About">
                    <li className="mt-3 hover:text-gray-400 no-underline text-white">
                      About
                    </li>
                  </Link>
                  <Link to="/Contact">
                    <li className="mt-3 hover:text-gray-400">Contact us</li>
                  </Link>
                  <Link to="/Terms">
                    <li className="mt-3 hover:text-gray-400">
                      Terms of Service
                    </li>
                  </Link>
                  <Link to="/RefundPolicy">
                    <li className="mt-3 hover:text-gray-400">Refund policy</li>
                  </Link>
                </ol>
              </div>

              <div>
                <p className="font-bold text-white text-left ml-9 mt-4">
                  Support
                </p>
                <ol className="font-normal text-sm text-white text-left ml-9">
                  <Link to="/TrackYourOrder">
                    <li className="mt-3 hover:text-gray-400">
                      Track your order
                    </li>
                  </Link>
                  <Link to="/PrivacyPolicy">
                    <li className="mt-3 hover:text-gray-400">Privacy policy</li>
                  </Link>
                  <Link to="/Terms">
                    <li className="mt-3 hover:text-gray-400">
                      Terms & conditions
                    </li>
                  </Link>
                  <Link to="/ExchangeAndReturn">
                    <li className="mt-3 hover:text-gray-400">
                      Exchange & Return
                    </li>
                  </Link>
                  <Link to="/CancellationPolicy">
                    <li className="mt-3 hover:text-gray-400">
                      Cancellation policy
                    </li>
                  </Link>
                </ol>
              </div>

              <div>
                <p className="font-bold text-white text-left ml-9 mt-4">
                  Can we help you?
                </p>
                <p className="font-medium text-white text-left mt-3 ml-9">
                  Call us:
                </p>
                <p className="font-normal text-sm text-white text-left underline ml-9">
                  +92 311 1100439
                </p>
                <p className="font-medium text-white text-left ml-9">
                  Timings:
                </p>
                <ol className="font-normal text-sm text-white text-left ml-9">
                  <li>Monday to Friday: 10:00 AM to 05:00 PM</li>
                  <li>Saturday: 10:00 AM to 3:00 PM</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden w-full bg-black">
        <p className="text-white text-left ml-5 font-normal pt-5">Newsletter</p>
        <p className="text-white ml-5 text-left text-sm font-normal mt-2">
          Sign up for exclusive updates, new arrivals & insider only discounts
        </p>
        <div className="bg-black p-6 flex space-x-6">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 text-2xl transition"
          >
            <FaFacebookF />
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-600 text-2xl transition"
          >
            <FaYoutube />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500 text-2xl transition"
          >
            <FaInstagram />
          </a>
        </div>
        <hr className="ml-4 mr-4" />
        <div className="max-w-3xl mx-auto px-4 text-white rounded-lg shadow-lg">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-600 py-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{item.question}</h3>
                <span className="text-xl">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <div className="mt-2 text-gray-300 text-left space-y-2">
                  {Array.isArray(item.answer) ? (
                    item.answer.map((line, idx) => (
                      <p key={idx} className="hover:text-gray-400">
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="hover:text-gray-400">{item.answer}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <hr className="ml-4 mr-4" />
        <div>
          <p className="font-bold text-white text-left ml-4 mt-4">
            Can we help you?
          </p>
          <p className="font-bold text-white text-left mt-3 ml-4">Call us:</p>
          <p className="font-normal text-sm text-white text-left underline ml-4">
            +92 311 1100439
          </p>
          <p className="font-bold text-white text-left ml-4">Timings:</p>
          <ol className="font-normal text-sm text-white text-left ml-4">
            <li>Monday to Friday: 10:00 AM to 05:00 PM</li>
            <li>Saturday: 10:00 AM to 3:00 PM</li>
          </ol>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
