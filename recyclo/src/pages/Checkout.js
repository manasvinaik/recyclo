import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [] } = location.state || {};

  // Calculate total
  const totalPrice = cartItems.reduce((sum, item) => {
    // Extract numeric value before '/'
    const numericPrice = parseFloat(item.product_price.split("/")[0].replace(/[^0-9.]/g, "")) || 0;
    return sum + numericPrice * item.quantity;
  }, 0);

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Order placed successfully! Total: ₹${totalPrice}`);
    navigate("/products"); // redirect to products or home
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="checkout-empty">No items in cart.</p>
      ) : (
        <>
          <table className="checkout-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price (₹)</th>
                <th>Subtotal (₹)</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const numericPrice = parseFloat(item.product_price.split("/")[0].replace(/[^0-9.]/g, "")) || 0;
                return (
                  <tr key={item.id}>
                    <td>{item.product_title}</td>
                    <td>{item.quantity}</td>
                    <td>{numericPrice}</td>
                    <td>{numericPrice * item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="checkout-total">
            <h3>Total Amount: ₹{totalPrice}</h3>
          </div>

          <form className="payment-form" onSubmit={handlePayment}>
            <label>Select Payment Method:</label>
            <select required className="payment-select">
              <option value="">--Choose--</option>
              <option value="credit_card">Credit / Debit Card</option>
              <option value="upi">UPI</option>
              <option value="netbanking">Net Banking</option>
              <option value="cash">Cash on Delivery</option>
            </select>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;