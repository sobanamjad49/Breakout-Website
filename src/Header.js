import React from "react";
import { useState, useEffect } from "react";
import { ShoppingCart, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Menu, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

function Header() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const { cart, updateCartQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Listen for login events
  useEffect(() => {
    const handleLogin = () => {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    };

    window.addEventListener("userLogin", handleLogin);

    return () => {
      window.removeEventListener("userLogin", handleLogin);
    };
  }, []);

  const handleUpdateQty = (id, size, qty, _id) => {
    if (qty >= 1) updateCartQuantity(id, size, qty, _id);
  };

  const handleNavigate = (route) => {
    setIsOpen(false);
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUserName("");
    navigate("/login");
  };

  return (
    <div className="top-0 sticky z-50 bg-white ">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3  ">
        <div className="block sm:hidden mr-5 ">
          {/* Button */}
          <button
            onClick={() => setIsOpen(true)}
            className=" bg-white m-4 flex justify-start"
          >
            <Menu className="w-6 h-6 text-black" />
          </button>

          {/* Overlay */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Close Button */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="uppercase pt-1 text-2xl font-semibold ">
                Breakout
              </div>
              <button onClick={() => setIsOpen(false)} className="text-2xl ">
                &times;
              </button>
            </div>

            {/* Menu List (Static) */}
            <div className="max-h-[80vh] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="User"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm font-medium">Hi, {userName}</span>
              </div>
              <div
                onClick={() => handleNavigate("/men")}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <span>MEN</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="w-full bg-white shadow-sm py-3 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-6 justify-start md:justify-center">
                <Link to="/Men">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    T-SHIRTS
                  </span>
                </Link>
                <Link to="/MenPolos">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    POLOS
                  </span>
                </Link>
                <Link to="/MenJeans">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    JEANS
                  </span>
                </Link>
                <Link to="/MenAccessories">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    ACCESSORIES
                  </span>
                </Link>
              </div>

              <div
                onClick={() => handleNavigate("/women")}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <span>WOMEN</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="w-full bg-white shadow-sm py-3 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-6 justify-start md:justify-center">
                <Link to="/Women">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    T-SHIRTS
                  </span>
                </Link>
                <Link to="/WomenDress">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    DRESSES
                  </span>
                </Link>
                <Link to="/WomenJeans">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    JEANS
                  </span>
                </Link>
                <Link to="/WomenAccessories">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    ACCESSORIES
                  </span>
                </Link>
              </div>
              <div
                onClick={() => handleNavigate("/boy")}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <span>BOYS</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="w-full bg-white shadow-sm py-3 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-6 justify-start md:justify-center">
                <Link to="/Boy">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    T-SHIRTS
                  </span>
                </Link>
                <Link to="/BoyPolos">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    POLOS
                  </span>
                </Link>
                <Link to="/BoyShirts">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    SHIRTS
                  </span>
                </Link>
                <Link to="/BoysAccessories">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    ACCESSORIES
                  </span>
                </Link>
              </div>
              <div
                onClick={() => handleNavigate("/girls")}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <span>GIRLS</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="w-full bg-white shadow-sm py-3 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-6 justify-start md:justify-center">
                <Link to="/Girls">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    T-SHIRTS
                  </span>
                </Link>
                <Link to="/GirlsShirt">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    SHIRTS
                  </span>
                </Link>
                <Link to="/GirlsJeans">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    JEANS
                  </span>
                </Link>
                <Link to="/GirlsAccessories">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300">
                    ACCESSORIES
                  </span>
                </Link>
              </div>
              <div
                onClick={() => handleNavigate("/")}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <span>#BREAKOUTSTYLE</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              <div
                onClick={() => handleNavigate("/Signup")}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <span>CREATE AN ACCOUNT</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="sm:block hidden">
          <div className="flex justify-evenly ml-3 gap-x-8 mt-4 mb-3 ">
            <div className="group">
              <Link to="/Men">
                {" "}
                <button
                  className="relative text-xs font-medium text-gray-800 hover:text-black transition-colors duration-300
  after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px]
  after:bg-black after:opacity-0 hover:after:w-full hover:after:opacity-100
  after:transition-all after:duration-300"
                >
                  MEN
                </button>
              </Link>
              <div className="hidden group-hover:flex flex-col absolute left-0 p-10 w-full bg-white z-20 text-black ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  <div>
                    <Link to="/Men">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        T-SHIRTS
                      </p>
                    </Link>
                  </div>

                  <div>
                    <Link to="/MenPolos">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        POLOS
                      </p>
                    </Link>
                  </div>

                  <div>
                    <Link to="/MenJeans">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        JEANS
                      </p>
                    </Link>
                  </div>
                  <div>
                    <Link to="/MenAccessories">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        ACCESSORIES
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="group ">
              <Link to="/Women">
                {" "}
                <button
                  className="relative text-xs font-medium text-gray-800 hover:text-black transition-colors duration-300
  after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px]
  after:bg-black after:opacity-0 hover:after:w-full hover:after:opacity-100
  after:transition-all after:duration-300"
                >
                  WOMEN
                </button>
              </Link>
              <div className="hidden group-hover:flex flex-col absolute left-0 p-10 w-full bg-white z-20 text-black ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  <div>
                    <Link to="/Women">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        T-SHIRTS
                      </p>
                    </Link>
                  </div>

                  <div>
                    <Link to="/WomenDress">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        DRESSES
                      </p>
                    </Link>
                  </div>

                  <div>
                    <Link to="/WomenJeans">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        JEANS
                      </p>
                    </Link>
                  </div>
                  <div>
                    <Link to="/WomenAccessories">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        ACCESSORIES
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="group ">
              <Link to="/Boy">
                {" "}
                <button
                  className="relative text-xs font-medium text-gray-800 hover:text-black transition-colors duration-300
  after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px]
  after:bg-black after:opacity-0 hover:after:w-full hover:after:opacity-100
  after:transition-all after:duration-300"
                >
                  BOYS
                </button>
              </Link>
              <div className="hidden group-hover:flex flex-col absolute left-0 p-10 w-full bg-white z-20 text-black ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  <div>
                    <Link to="/Boy">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        T-SHIRTS
                      </p>
                    </Link>
                  </div>

                  <div>
                    <Link to="/BoyPolos">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        POLOS
                      </p>
                    </Link>
                  </div>

                  <div>
                    <Link to="/BoyShirts">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        SHIRTS
                      </p>
                    </Link>
                  </div>
                  <div>
                    <Link to="/BoysAccessories">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        ACCESSORIES
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="group ">
              <Link to="/Girls">
                {" "}
                <button
                  className="relative text-xs font-medium text-gray-800 hover:text-black transition-colors duration-300
  after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px]
  after:bg-black after:opacity-0 hover:after:w-full hover:after:opacity-100
  after:transition-all after:duration-300"
                >
                  GIRLS
                </button>
              </Link>
              <div className="hidden group-hover:flex flex-col absolute left-0 p-10 w-full bg-white z-20 text-black ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  <div>
                    <Link to="/Girls">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        T-SHIRTS
                      </p>
                    </Link>
                  </div>

                  <div>
                    <Link to="/GirlsShirt">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        SHIRTS
                      </p>
                    </Link>
                  </div>

                  <div>
                    <Link to="/GirlsJeans">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        JEANS
                      </p>
                    </Link>
                  </div>
                  <div>
                    <Link to="/GirlsAccessories">
                      {" "}
                      <p className="underline text-gray-600 font-bold  hover:text-black">
                        ACCESSORIES
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link to="/">
          {" "}
          <div className="uppercase mt-3  text-2xl font-semibold flex justify-center ">
            Breakout
          </div>
        </Link>

        <div className="flex items-center justify-end gap-4  mr-2">
          <div>
            {/* Profile Section */}
            {userName ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium sm:block hidden">
                  Hi, {userName}
                </span>
                <div className="border-2 border-black p-1 rounded-full sm:block hidden">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                    alt="Profile Icon"
                    className="w-3 h-3 object-cover"
                  />
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs p-1 bg-gradient-to-r from-red-200 to-rose-200 text-red-800 rounded-md hover:from-red-500 hover:to-rose-500 hover:text-white transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/Login">
                <div className="border-2 border-black p-2 rounded-full">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                    alt="Profile Icon"
                    className="w-4 h-4 object-cover"
                  />
                </div>
              </Link>
            )}
          </div>
          {/* Cart Icon Button */}
          <button
            onClick={() => setShowCart(true)}
            className="p-2 border-2 border-black rounded-full"
          >
            <ShoppingCart className="w-3 h-3 text-black" />
          </button>

          {/* Cart Offcanvas */}
          {showCart && (
            <div className="fixed top-0 right-0 h-full w-80 bg-white border-l-2 border-gray-300 shadow-lg z-50 flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-red-500 text-xl"
                >
                  &times;
                </button>
              </div>
              {console.log("ewee===d=>", cart)}
              {/* Cart Items (Scrollable) */}
              <div className="p-4 overflow-y-auto flex-1">
                {cart?.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Your cart is empty.
                  </p>
                ) : (
                  cart?.map((item) => (
                    <div
                      key={item._id + item.size}
                      className="mb-4 flex gap-4 border-b pb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex flex-col flex-1">
                        <p className="font-semibold">{item.name}</p>
                        {item.size && (
                          <p className="text-sm text-gray-600">
                            Size: {item.size}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-800 font-semibold">
                          PKR {item.price * item.quantity}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="px-2 py-1 border rounded text-sm"
                            onClick={() =>
                              handleUpdateQty(
                                item.productId._id
                                  ? item.productId._id
                                  : item.productId,
                                item.selectedSize,
                                item.quantity - 1,
                                item._id
                              )
                            }
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="px-2 py-1 border rounded text-sm"
                            onClick={() =>
                              handleUpdateQty(
                                item.productId._id
                                  ? item.productId._id
                                  : item.productId,
                                item.selectedSize,
                                item.quantity + 1,
                                item._id
                              )
                            }
                          >
                            +
                          </button>
                          <button
                            className="ml-auto text-red-500 text-sm"
                            onClick={() =>
                              removeFromCart(item.cartId, item._id)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Button */}
              {cart?.length > 0 && (
                <div className="p-4 border-t">
                  <Link
                    to="/checkout"
                    onClick={() => setShowCart(false)}
                    className="block w-full text-center bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
