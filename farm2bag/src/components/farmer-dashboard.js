import React, { useState, useEffect } from "react";
import "./farmer-dashboard.css"; // ✅ Import CSS
import axios from "axios";

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", category: "vegetables" });

  // ✅ Fetch products from MongoDB
  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // ✅ Add a product to MongoDB
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.category) return;

    axios.post("http://localhost:5000/products", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: "", price: "", description: "", category: "vegetables" });
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  // ✅ Update product in MongoDB
  const handleUpdateProduct = (id) => {
    const updatedProduct = { ...products.find((p) => p._id === id), price: "$12" };

    axios.put(`http://localhost:5000/products/${id}`, updatedProduct)
      .then((response) => {
        setProducts(products.map((p) => (p._id === id ? response.data : p)));
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  // ✅ Delete product from MongoDB
  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p._id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div className="dashboard-container">
      <h2>Farmer Dashboard</h2>

      {/* Add Product Section */}
      <div className="add-product">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
          <option value="greens">Greens</option>
          <option value="plants">Plants</option>
        </select>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Product Listings */}
      <h3>Current Listings</h3>
      <div className="product-list"> {/* ✅ Applied correct CSS class */}
        {products.map((product) => (
          <div className="product-card" key={product._id}> {/* ✅ Corrected card structure */}
            <strong>{product.name}</strong>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <p><em>Category:</em> {product.category}</p>
            <button className="update-btn" onClick={() => handleUpdateProduct(product._id)}>
              Update Price
            </button>
            <button className="delete-btn" onClick={() => handleDeleteProduct(product._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmerDashboard;
