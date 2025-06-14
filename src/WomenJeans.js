import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "./products"; // shared product data

function WomenJeans() {
  const [columns, setColumns] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await products();
        const filtered = allProducts.filter(
          (product) => product.category === "WomenJeans"
        );
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Error in WomenJeans component:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const boxStyle = (active) => ({
    width: "12px",
    height: "13px",
    backgroundColor: active ? "blue" : "#666",
    margin: "2px",
    borderRadius: "3px",
    display: "inline-block",
  });

  const gridColsClass = {
    1: "grid grid-cols-2",
    2: "grid grid-cols-3",
    3: "grid grid-cols-4",
  };

  return (
    <div className="mt-5">
      {/* Buttons */}
      <div style={{ marginBottom: "20px", textAlign: "right" }}>
        {[1, 2, 3].map((col) => (
          <button
            key={col}
            onClick={() => setColumns(col)}
            style={{ marginRight: "5px" }}
            aria-pressed={columns === col}
            aria-label={`Set grid columns to ${col + 1}`}
          >
            <div>
              {[...Array(col)].map((_, i) => (
                <div key={i} style={boxStyle(columns === col)}></div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Product Grid */}
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

export default WomenJeans;
