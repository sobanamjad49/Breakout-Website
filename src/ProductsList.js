import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "./products"; // Static/dynamic product data fetch function

function ProductList() {
  // State to store the list of products
  const [productList, setProductList] = useState([]);

  // State to show loading status jab tak data aata hai
  const [loading, setLoading] = useState(true);

  // useEffect tab chalega jab component load ho (mount ho)
  useEffect(() => {
    // Async function to get products from API or file
    const getProducts = async () => {
      try {
        // products() function call karke data fetch kar rahe hain
        const allProducts = await products();

        // Jo products aaye unhein state mein set kar diya
        setProductList(allProducts);
      } catch (error) {
        // Agar koi error aaye to usay console mein dikhaya
        console.error("Error in ProductList component:", error);
      } finally {
        // Loading ko false set kar diya (chahe success ho ya error)
        setLoading(false);
      }
    };

    // Function ko call kiya
    getProducts();
  }, []); // Empty dependency array means sirf 1 dafa chalega jab component mount ho

  // Jab tak data load ho raha hai, "Loading..." dikhayein
  if (loading) {
    return <div>Loading...</div>;
  }

  // Jab loading complete ho jaye to products ka grid dikhayein
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
      {productList.map((product) => (
        // Har product ka card - `Link` se detail page par jaa sakte hain
        <Link
          key={product._id} // Har element ko unique key deni hoti hai
          to={`/productdetails/${product._id}`} // Detail page ke route
          className="border rounded-lg p-3 hover:shadow-lg transition-shadow duration-300"
        >
          {/* Product image */}
          <img
            src={product.images[0]} // Pehli image dikhayi ja rahi hai
            alt={product.name}
            className="w-full object-cover rounded"
          />
          {/* Product name */}
          <h3 className="mt-2 font-semibold">{product.name}</h3>

          {/* Product price */}
          <p className="text-sm text-gray-700">PKR {product.price}</p>
        </Link>
      ))}
    </div>
  );
}

export default ProductList;
