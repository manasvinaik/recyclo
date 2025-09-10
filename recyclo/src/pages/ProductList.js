import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/ProductList.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/") // Django API
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Group by category
  const groupedProducts = products.reduce((groups, product) => {
    if (!groups[product.category]) groups[product.category] = [];
    groups[product.category].push(product);
    return groups;
  }, {});

  // Filter by search term
  const filteredProducts = Object.keys(groupedProducts).reduce((groups, category) => {
    const filtered = groupedProducts[category].filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) groups[category] = filtered;
    return groups;
  }, {});

  // Add product to cart (POST to Django backend)
  const handleAddToCart = (product) => {
    fetch("http://127.0.0.1:8000/api/cart/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: product.id, quantity: 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`${product.title} added to cart!`);
      })
      .catch((err) => console.error(err));
  };

  return (
    
    <div className="product-list-container">
      <Navbar></Navbar>
      <div className="heading-row">
        <h1 className="main-heading">Eco-Friendly Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {Object.keys(filteredProducts).map((category, idx) => (
        <div key={idx} className="category-section">
          <h2 className="category-heading">{category}</h2>
          <div className="product-grid">
            {filteredProducts[category].map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/products/${product.id}`} className="card-link">
                  <img src={product.image} alt={product.title} className="product-img" />
                </Link>
                <p className="title"><b>{product.title}</b></p>
                <p className="price">{product.price}</p>
                <div className="buttons">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-green"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}