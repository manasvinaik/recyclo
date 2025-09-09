import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cart/")
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error(err));
  }, []);

  const handleRemove = (id) => {
    fetch(`http://127.0.0.1:8000/api/cart/${id}/`, { method: "DELETE" })
      .then(() => setCartItems(cartItems.filter((item) => item.id !== id)))
      .catch((err) => console.error(err));
  };

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;

    fetch(`http://127.0.0.1:8000/api/cart/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQty }),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: updatedItem.quantity } : item
          )
        );
      })
      .catch((err) => console.error(err));
  };

  // Calculate total using numeric value before '/'
  const totalPrice = cartItems.reduce((sum, item) => {
    const numericPrice = parseFloat(item.product_price.split("/")[0].replace(/[^0-9.]/g, "")) || 0;
    return sum + numericPrice * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th className="cart-header">Item</th>
                <th className="cart-header">Quantity</th>
                <th className="cart-header">Price</th>
                <th className="cart-header">Subtotal</th>
                <th className="cart-header"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const numericPrice = parseFloat(item.product_price.split("/")[0].replace(/[^0-9.]/g, "")) || 0;
                return (
                  <tr key={item.id} className="cart-row">
                    {/* Item */}
                    <td className="cart-cell">
                      <div className="cart-product-info">
                        <img
                          src={item.product_image}
                          alt={item.product_title}
                          className="cart-img"
                        />
                        <span>{item.product_title}</span>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="cart-cell">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="cart-qty-input"
                      />
                    </td>

                    {/* Price */}
                    <td className="cart-cell">{numericPrice}</td>

                    {/* Subtotal */}
                    <td className="cart-cell">{numericPrice * item.quantity}</td>

                    {/* Remove */}
                    <td className="cart-cell">
                      <button
                        className="cart-remove-btn"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Total */}
          <div className="cart-total">
            <h3>Total: ₹{totalPrice}</h3>
          </div>

          {/* Checkout button */}
          <div className="checkout-btn-container">
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout", { state: { cartItems } })}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;