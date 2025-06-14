import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

// 🔰 Shuruati form ka data (empty state)
const initialForm = {
  id: "",
  name: "",
  price: "",
  oldPrice: "",
  discount: "",
  description: "",
  images: ["", "", "", ""], // 4 images ke liye
  sizes: [],
  category: "",
};

// ✅ Size input wala chhota component
const SizesInput = ({ sizes, setSizes }) => {
  const [input, setInput] = useState("");

  // Jab Enter, comma ya space dabaya jaye to size add ho jaye
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      const value = input.trim().toUpperCase();
      if (value && !sizes.includes(value)) {
        setSizes([...sizes, value]);
      }
      setInput("");
    }
  };

  // Size delete karna
  const removeSize = (sizeToRemove) => {
    setSizes(sizes.filter((size) => size !== sizeToRemove));
  };

  return (
    <div>
      <label className="block mb-1 font-semibold">Sizes:</label>
      <div
        className="flex flex-wrap gap-2 p-2 border rounded min-h-[40px] items-center cursor-text"
        onClick={() => document.getElementById("sizeInput").focus()}
      >
        {/* Existing sizes */}
        {sizes.map((size) => (
          <div
            key={size}
            className="flex items-center bg-gray-200 text-black rounded px-3 py-1 text-sm"
          >
            {size}
            <button
              type="button"
              onClick={() => removeSize(size)}
              className="ml-2 font-bold text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        ))}
        {/* New size input */}
        <input
          id="sizeInput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type size and press Enter"
          className="flex-grow outline-none border-none p-1 text-sm"
        />
      </div>
    </div>
  );
};

// 🧾 Dashboard Products Component
const DashboardProducts = () => {
  const [products, setProducts] = useState([]); // Saare products
  const [form, setForm] = useState(initialForm); // Form state
  const [editingId, setEditingId] = useState(null); // Agar edit ho raha ho
  const [searchTerm, setSearchTerm] = useState(""); // Search bar
  const formRef = useRef(null); // Form reference for scroll

  // 📡 Backend se products laana
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:7474/products/getproduct");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Jab component load ho to fetch karein
  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Check karna ke ID already exist to nahi
  const isDuplicateId = products.some(
    (p) => String(p.id) === String(form.id) && p.id !== editingId
  );

  // 📨 Form submit karne ka kaam (Add ya Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDuplicateId) {
      alert("Error: A product with this ID already exists!");
      return;
    }

    try {
      if (editingId) {
        // Agar edit ho raha hai
        await axios.put(
          `http://localhost:7474/products/updateproduct/${editingId}`,
          form
        );
      } else {
        // Naya product add karna
        await axios.post("http://localhost:7474/products/addproduct", form);
      }

      setForm(initialForm); // Form reset
      setEditingId(null);   // Edit mode off
      fetchProducts();      // Data dobara fetch karo
    } catch (err) {
      console.error(err);
    }
  };

  // ✏️ Product edit karne par form mein values daalna
  const handleEdit = (product) => {
    const completeImages = [...(product.images || [])];
    while (completeImages.length < 4) completeImages.push(""); // 4 images ensure karo

    setForm({
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      discount: product.discount,
      description: product.description,
      images: completeImages,
      sizes: product.sizes || [],
      category: product.category,
    });

    setEditingId(product.id);
    formRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll form ke upar
  };

  // ❌ Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7474/products/deleteproduct/${id}`);
      fetchProducts(); // Dobara data lao
    } catch (err) {
      console.error(err);
    }
  };

  // 📸 Image field update karna
  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  // 🔍 Search/filter karna
  const filteredProducts = products.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      String(p.id).toLowerCase().includes(term) ||
      (p.name || "").toLowerCase().includes(term) ||
      (p.category || "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-2">Products Management</h2>
      <p className="mb-4 text-gray-600">Total Products: {products.length}</p>

      {/* 🔎 Search bar */}
      <input
        type="text"
        placeholder="Search by ID , Name or Category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />

      {/* 🧾 Product Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >
        {/* Saare form fields */}
        <input type="text" placeholder="Product ID" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} className="p-2 border rounded" required />
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="p-2 border rounded" required />
        <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="p-2 border rounded" required />
        <input type="number" placeholder="Old Price" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} className="p-2 border rounded" />
        <input type="number" placeholder="Discount %" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} className="p-2 border rounded" />
        <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="p-2 border rounded" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="p-2 border rounded col-span-1 md:col-span-2" />

        {/* 4 image fields */}
        {form.images.map((img, i) => (
          <input key={i} type="text" placeholder={`Image URL ${i + 1}`} value={img} onChange={(e) => handleImageChange(i, e.target.value)} className="p-2 border rounded" />
        ))}

        {/* Size input */}
        <div className="col-span-1 md:col-span-2">
          <SizesInput sizes={form.sizes} setSizes={(sizes) => setForm({ ...form, sizes })} />
        </div>

        {/* Agar duplicate ID ho to error message */}
        {isDuplicateId && (
          <p className="text-red-600 col-span-2 text-sm font-semibold">
            A product with this ID already exists.
          </p>
        )}

        {/* Submit & Clear Buttons */}
        <button
          type="submit"
          className={`py-2 rounded font-semibold text-white ${
            isDuplicateId
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={isDuplicateId}
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>

        <button
          type="button"
          onClick={() => {
            setForm(initialForm);
            setEditingId(null);
          }}
          className="py-2 rounded font-semibold bg-yellow-500 text-white hover:bg-yellow-600"
        >
          Clear
        </button>
      </form>

      {/* 📋 Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Old Price</th>
              <th className="border p-2">Discount</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Sizes</th>
              <th className="border p-2">Images</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="border p-2">{p.id}</td>
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">{p.price}</td>
                  <td className="border p-2">{p.oldPrice}</td>
                  <td className="border p-2">{p.discount}%</td>
                  <td className="border p-2">{p.category}</td>
                  <td className="border p-2">
                    {p.sizes && p.sizes.length > 0 ? p.sizes.join(", ") : "-"}
                  </td>
                  <td className="border p-2">
                    <div className="flex flex-wrap gap-1">
                      {p.images?.map((img, i) =>
                        img ? (
                          <img
                            key={i}
                            src={img}
                            alt={`img${i + 1}`}
                            className="w-12 h-12 object-cover rounded border"
                          />
                        ) : null
                      )}
                    </div>
                  </td>
                  <td className="border p-2 max-w-xs break-words">
                    {p.description}
                  </td>
                  <td className="border p-2 space-y-1">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 block w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete product ${p.id}?`
                          )
                        ) {
                          handleDelete(p.id);
                        }
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 block w-full"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardProducts;
