import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      width: "200px",
      textAlign: "center"
    }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
          <button>View Details</button>
        </Link>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;