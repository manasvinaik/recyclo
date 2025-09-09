import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-around",
      padding: "10px 0",
      backgroundColor: "#2e7d32",
      color: "white"
    }}>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/products" style={{ color: "white", textDecoration: "none" }}>Products</Link>
      <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>Cart</Link>
      <Link to="/checkout" style={{ color: "white", textDecoration: "none" }}>Checkout</Link>
      {/* <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link> */}
    </nav>
  );
}

export default Navbar;