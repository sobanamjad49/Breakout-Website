// Ye function server se products ki list fetch karta hai
const fetchProducts = async () => {
  try {
    // Server se request bhej rahe hain — URL local server ka hai
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/getproduct`);

    // Agar response ok (200 status) nahi hai to error throw karo
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Server se jo data mila usay JSON format mein convert karo
    const data = await response.json();

    // Data return kar do taake component mein use ho sake
    return data;
  } catch (error) {
    // Agar fetch ya JSON convert mein koi error aaye to console mein show karo
    console.error("Error fetching products:", error);

    // Agar koi problem aaye to khaali array return karo
    return [];
  }
};

// Is function ko doosri files mein use karne ke liye export kar rahe hain
export default fetchProducts;
