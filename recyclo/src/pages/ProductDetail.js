import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/ProductDetail.css"
function ProductDetail() {
  const { id } = useParams(); // get the product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product from Django API
    fetch(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error(err);
        setProduct(null);
      });
  }, [id]);

  if (!product)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Product not found</p>;

  return (
    <div style={styles.container}>
      <Navbar></Navbar>
      <h1 style={styles.title}>{product.title}</h1>
      <img src={product.image} alt={product.title} style={styles.image} />
      <p style={styles.description}>{product.description}</p>
      <p style={styles.price}>{product.price}</p>
      <Link to="/products" style={styles.backLink}>
        ← Back to Products
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px 20px",
    maxWidth: "800px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#2c7a7b",
    marginBottom: "20px",
    textAlign: "center",
  },
  image: {
    width: "300px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    margin: "20px 0",
    boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#4a5568",
    textAlign: "center",
    maxWidth: "600px",
    marginBottom: "20px",
  },
  price: {
    fontWeight: "bold",
    fontSize: "22px",
    color: "#1a202c",
    margin: "15px 0",
  },
  backLink: {
    marginTop: "20px",
    textDecoration: "none",
    fontSize: "16px",
    color: "#3182ce",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
};

export default ProductDetail;