// React aur routing related imports
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Dummy product data ya fetch function
import products from "./products";

// Cart context jisme add, remove, update functions available hain
import { useCart } from "./CartContext";

function ProductDetails() {
  // URL se productId le rahe hain (React Router ka useParams hook)
  const { productId } = useParams();

  // React state variables
  const [product, setProduct] = useState(null); // selected product
  const [loading, setLoading] = useState(true); // loading indicator
  const [mainImage, setMainImage] = useState(""); // selected image for gallery
  const [selectedSize, setSelectedSize] = useState(""); // selected size
  const [quantity, setQuantity] = useState(1); // selected quantity
  const [isOpen, setIsOpen] = useState(false); // cart drawer open/close
  const [lgShow, setLgShow] = useState(false); // size chart modal show/hide

  // Cart functions from context
  const { addToCart, cart, removeFromCart, updateCartQuantity } = useCart();

  // Product data fetch karna on component mount
  useEffect(() => {
    const getProduct = async () => {
      try {
        const allProducts = await products(); // sab products fetch karo
        const foundProduct = allProducts.find((p) => p?._id === productId); // match by ID
        setProduct(foundProduct);
        if (foundProduct?.images?.length > 0) {
          setMainImage(foundProduct.images[0]); // default image set karo
        }
      } catch (error) {
        console.error("Error in ProductDetails component:", error);
      } finally {
        setLoading(false); // loading complete
      }
    };

    getProduct();
  }, [productId]);

  // Agar loading ho to loading message dikhao
  if (loading) {
    return <div>Loading...</div>;
  }

  // Agar product nahi mila
  if (!product) {
    return (
      <p className="text-center text-red-500 text-lg mt-10">
        Product not found!
      </p>
    );
  }

  // Add to cart button ka function
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    // Product object ke sath cart me add karo
    addToCart({
      ...product,
      _id: product._id,
      size: selectedSize,
      quantity,
    });

    setIsOpen(true); // cart drawer open
  };

  // Quantity update karne ka function
  const handleUpdateQty = (id, size, newQty, _id) => {
    if (newQty <= 0) return;
    updateCartQuantity(id, size, newQty, _id);
  };

  // Main JSX return
  return (
    <div className="max-w-6xl mx-auto p-5 grid md:grid-cols-2 gap-8">
      {/*  Left Side: Product Image Gallery */}
      <div>
        <img
          src={mainImage}
          alt={product.name}
          className="w-full rounded-lg shadow"
        />
        <div className="flex mt-4 space-x-2 overflow-x-auto justify-center">
          {(product.images ?? []).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                mainImage === img ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* ========== Right Side: Product Details ========== */}
      <div className="sticky top-16" style={{ alignSelf: "start" }}>
        <div className="space-y-3 text-left ml-4">
          <p className="text-xs font-medium">{product.name}</p>
          <p className="text-xs font-medium">{product.description}</p>
          <p className="text-xs font-medium">
            Crafted in soft , this Colors features an inverted overall print
            that brings a subtle graphic twist to a clean, easygoing silhouette.
          </p>
          <p className="text-xs font-medium">Crafted in soft ...</p>
          <p className="text-xs font-medium">100% Pure</p>

          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-red-700">
              PKR {product.price}
            </span>
            <span className="text-sm line-through text-gray-600">
              PKR {product.oldPrice}
            </span>
            <span className="text-sm font-medium bg-yellow-200 px-2 py-0.5 text-[#119d77]">
              {product.discount}%
            </span>
          </div>

          {/* ====== Size Chart Modal Button ====== */}
          <p
            className="text-xs font-medium cursor-pointer underline mt-2"
            onClick={() => setLgShow(true)}
          >
            SIZE CHART
          </p>

          {/* ====== Size Chart Modal ====== */}
          {lgShow && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg max-w-2xl w-full shadow-lg relative max-h-[90vh] overflow-y-auto mt-auto">
                <div className="flex justify-between items-center px-4 py-2 border-b sticky top-0 bg-white z-10">
                  <h3 className="text-lg font-semibold">Size Chart</h3>
                  <button
                    onClick={() => setLgShow(false)}
                    className="text-xl text-gray-600 hover:text-black"
                  >
                    &times;
                  </button>
                </div>
                <div className="p-4">
                  <img
                    src="https://size-chart.kalis.no/upload/bktt.myshopify.com/20230807134438_h6gd.jpg"
                    alt="Size Chart"
                    className="w-auto h-auto"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ====== Size Selection Buttons ====== */}
          <div className="flex flex-wrap gap-3 mt-1">
            {(product.sizes ?? []).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-sm px-3 py-1 border rounded ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white text-black border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <p className="text-xs font-medium mt-1">
            Model height is 6.0' and wearing M size.
          </p>

          {/* ====== Add to Cart Button ====== */}
          <div className="relative mt-2">
            <button
              onClick={handleAddToCart}
              className="w-[70%] py-3 rounded-md bg-black text-white border-2 border-black font-semibold text-sm tracking-wide transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:shadow-lg"
            >
              Add to Cart
            </button>

            {/* ====== Cart Drawer ====== */}
            <div
              className={`fixed top-0 right-0 h-screen w-96 bg-white shadow-lg border-l z-50 transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h2 className="font-bold text-lg">Cart</h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-black text-xl"
                    >
                      &times;
                    </button>
                  </div>

                  {/* Cart items loop */}
                  <div className="p-4 text-sm overflow-y-auto max-h-[65vh]">
                    {cart?.length > 0 ? (
                      cart.map((item) => (
                        <div
                          key={item._id + item.size}
                          className="p-2 border rounded shadow-sm flex gap-3 items-center mb-3"
                        >
                          <img
                            src={item.image}
                            alt="Cart Item"
                            className="w-24 h-24 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-base">
                              {item.name}
                            </p>
                            <p className="text-gray-600">Size: {item.size}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              {/* Quantity buttons */}
                              <button
                                onClick={() =>
                                  handleUpdateQty(
                                    item.productId?._id || item.productId,
                                    item.selectedSize,
                                    item.quantity - 1,
                                    item._id
                                  )
                                }
                                className="px-2 border rounded"
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() =>
                                  handleUpdateQty(
                                    item.productId?._id || item.productId,
                                    item.selectedSize,
                                    item.quantity + 1,
                                    item._id
                                  )
                                }
                                className="px-2 border rounded"
                              >
                                +
                              </button>
                            </div>
                            <p className="text-gray-800 font-medium mt-2">
                              PKR {item.price * item.quantity}
                            </p>
                            <button
                              onClick={() =>
                                removeFromCart(item.cartId, item._id)
                              }
                              className="text-red-600 text-xs mt-1 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Your cart is empty.</p>
                    )}
                  </div>
                </div>

                {/* Cart Total + Links */}
                <div className="p-4 space-y-2 border-t">
                  <p className="text-right font-semibold text-lg">
                    Total: PKR{" "}
                    {cart?.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )}
                  </p>
                  <Link to="/ViewCart">
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                      View Cart
                    </button>
                  </Link>
                  <Link to="/Checkout">
                    <button className="w-full mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* ====== Backdrop behind drawer ====== */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-black opacity-30 z-40"
                onClick={() => setIsOpen(false)}
              ></div>
            )}
          </div>

          {/* ====== Product Note and Care ====== */}
          <p className="text-xs font-medium mt-4 ">
            Actual colour may vary slightly due to lighting or screen
            differences.
          </p>
          <ul className="text-xs font-medium list-disc list-inside space-y-0.5 mt-2 pb-10">
            <li className="list-none font-bold text-sm">CARE</li>
            <li>Machine or handwash up to 30°C with like colors</li>
            <li>Wash and iron inside out to protect print</li>
            <li>Do not bleach or dry clean</li>
            <li>Tumble dry on low heat</li>
            <li>Iron on reverse, low heat</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
