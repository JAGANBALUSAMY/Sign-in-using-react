require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
});

const Product = mongoose.model("Product", ProductSchema);

// ✅ API Endpoints

// Get all products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add a product
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// Update a product
app.put("/products/:id", async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProduct);
});

// Delete a product
app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
