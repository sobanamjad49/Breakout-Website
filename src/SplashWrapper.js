// Required imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// SplashWrapper is a layout component that wraps around page content (children)
const SplashWrapper = ({ children }) => {
  // loading state: splash screen dikhane ke liye
  const [loading, setLoading] = useState(true);

  // useLocation se current URL path milta hai
  const location = useLocation();

  // Jab bhi path change ho (e.g., page switch), splash screen dikhao 1 sec ke liye
  useEffect(() => {
    setLoading(true); // Splash start
    const timer = setTimeout(() => {
      setLoading(false); // Splash end after 1 sec
    }, 1000);

    // Cleanup function: timer band karo agar component unmount ho jaye
    return () => clearTimeout(timer);
  }, [location.pathname]); // Jab bhi URL path change ho

  // Agar current route "/dashboard" hai to Header/Footer hide karo
  const hideHeaderFooter = location.pathname === "/dashboard";

  // Agar loading state true hai, to splash screen dikhayein
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        {/* Logo show karega center mein */}
        <img
          src="https://s3-ap-south-1.amazonaws.com/elasticbeanstalk-ap-south-1-607085342777/resources/logo/324705691-309048268_641302380984331_381300464182542427_n.jpg"
          alt="Breakout Logo"
          className="w-32 h-32 animate-pulse"
        />
      </div>
    );
  }

  // Jab loading false ho jaye to actual content dikhayein
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header tabhi dikhayega jab route /dashboard nahi hai */}
      {!hideHeaderFooter && <Header />}

      {/* Children = andar wrapped page content */}
      <main className="flex-grow">{children}</main>

      {/* Footer bhi conditionally show hota hai */}
      {!hideHeaderFooter && (
        <footer className="transition-opacity duration-300 opacity-100">
          <Footer />
        </footer>
      )}
    </div>
  );
};

// Exporting this wrapper so we can wrap pages in App.jsx
export default SplashWrapper;
