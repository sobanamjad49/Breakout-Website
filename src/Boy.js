import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "./products"; // 📦 Shared product fetching function ya data

function Boy() {
  // 📊 Grid columns ka state (1 = 2 cols, 2 = 3 cols, etc.)
  const [columns, setColumns] = useState(1);

  // 🔍 Boy category wale products
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ⏳ Loading indicator
  const [loading, setLoading] = useState(true);

  // 🚀 Component load hone par product fetch karna
  useEffect(() => {
    const getProducts = async () => {
      try {
        // 🧾 Saare products fetch karo
        const allProducts = await products();

        // 👦 "Boy" category ke products filter karo
        const filtered = allProducts.filter(
          (product) => product.category === "Boy"
        );

        // 🔃 Filtered list set karo
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("⚠️ Error in Boy component:", error);
      } finally {
        // ⛔ Loading end
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // ⏳ Jab tak data load ho raha ho
  if (loading) {
    return <div>Loading...</div>;
  }

  // 🔲 Grid button ke box style
  const boxStyle = (active) => ({
    width: "12px",
    height: "13px",
    backgroundColor: active ? "blue" : "#666",
    margin: "2px",
    borderRadius: "3px",
    display: "inline-block",
  });

  // 🔢 Grid column classes based on selected state
  const gridColsClass = {
    1: "grid grid-cols-2",
    2: "grid grid-cols-3",
    3: "grid grid-cols-4",
  };

  return (
    <div className="mt-5">
      {/* 🔘 Grid layout selection buttons */}
      <div style={{ marginBottom: "20px", textAlign: "right" }}>
        {[1, 2, 3].map((col) => (
          <button
            key={col}
            onClick={() => setColumns(col)} // 🔁 Grid columns set karo
            style={{ marginRight: "5px" }}
            aria-pressed={columns === col}
            aria-label={`Set grid columns to ${col + 1}`}
          >
            <div>
              {/* 🔷 Har button ke andar boxes show karo */}
              {[...Array(col)].map((_, i) => (
                <div key={i} style={boxStyle(columns === col)}></div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* 🖼️ Filtered products ki grid view */}
      <div className={`${gridColsClass[columns]} gap-1`}>
        {filteredProducts.map((product) => (
<div key={product._id} className="relative">
  <Link to={`/productdetails/${product._id}`}>
    {/* Image */}
    <img
      className="w-full  object-cover"
      src={product.images[0]}
      alt={product.name}
    />

    {/* ✅ Overlay only for 2-column view (columns === 1) */}
    {columns === 1 && (
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-sm">
        <div className="font-semibold">{product.name}</div>
        <div className="flex items-center gap-2">
          <span className="text-red-400">PKR {product.price}</span>
          {product.oldPrice && (
            <span className="line-through text-gray-300 text-xs">
              PKR {product.oldPrice}
            </span>
          )}
          {product.discount && (
            <span className="bg-yellow-300 text-black px-1 text-xs rounded">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>
    )}
  </Link>
</div>



        ))}
      </div>
    </div>
  );
}

export default Boy;
