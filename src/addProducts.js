// 📦 Axios ko import kar rahe hain HTTP requests ke liye
const axios = require("axios");

// 🧾 Products data file (yeh file mein array of products hona chahiye)
const products = require("./products");

// 🛒 Backend API endpoint jahan products add honge
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/products/addproduct`;

// 🔁 Saare products ko backend mein add karne ka async function
async function addProducts() {
  console.log("📤 Starting to add products...");

  let successCount = 0; // ✅ Kitne successfully add hue
  let errorCount = 0;   // ❌ Kitne fail hue

  // 🧭 Har product ko loop mein bhej rahe hain backend par
  for (const product of products) {
    try {
      // 📨 Product ko POST request ke through bhejna
      const response = await axios.post(API_URL, product);
      console.log(`✅ Successfully added product: ${product.name}`);
      successCount++;
    } catch (error) {
      // ❗ Agar koi error aaye to usay console mein dikhana
      console.error(`❌ Error adding product ${product.name}:`, error.message);
      errorCount++;
    }
  }

  // 📊 Summary after all products are processed
  console.log("\n📋 Summary:");
  console.log(`✅ Successfully added: ${successCount} products`);
  console.log(`❌ Failed to add: ${errorCount} products`);
}

// ▶️ Script ko run karna (aur agar koi error ho to catch karna)
addProducts().catch(console.error);
