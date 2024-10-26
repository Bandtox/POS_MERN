import React from 'react';
import '../CSS/Cart.css';
import axios from 'axios';

const Cart = ({ cart, expectedDelivery, address, setAddress, onRemoveItem, onUpdateQuantity, onUpdateSpiceLevel, onClearCart }) => {
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    onUpdateQuantity(itemId, newQuantity);
  };

  const handleSpiceLevelChange = (itemId, newSpiceLevel) => {
    onUpdateSpiceLevel(itemId, newSpiceLevel);
  };

  const handleCheckout = async () => {
    const total = calculateTotal();

    try {
      await axios.post('http://localhost/api/transactions', {
        cart,
        total,
        address,
        expectedDelivery
      });
      alert("Order placed successfully!");
      onClearCart();
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Error placing order. Please try again.");
    }
  };

  const total = calculateTotal();

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          <div className="cart-data-container">
            <div className="cart-items-container">
              <ul className="cart-items">
                {cart.map((item) => (
                  <li key={item._id} className="cart-item">
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <span>{item.name}</span>
                      <span className="cart-item-price">Price: ₹{item.price.toFixed(2)}</span>
                      <div className="cart-item-options">
                        <label>Quantity:</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value, 10))}
                        />
                        <label>Spice Level:</label>
                        <select
                          value={item.spiceLevel}
                          onChange={(e) => handleSpiceLevelChange(item._id, e.target.value)}
                        >
                          <option value="mild">Mild</option>
                          <option value="medium">Medium</option>
                          <option value="hot">Hot</option>
                          <option value="extra-hot">Extra Hot</option>
                        </select>
                        <button className="remove-item-button" onClick={() => onRemoveItem(item._id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cart-summary-container">
              <div className="cart-summary">
                <div className="cart-summary-item">
                  <strong>Total:</strong> ₹{total}
                </div>
                <div className="cart-summary-item">
                  <strong>Expected Delivery Time:</strong> {expectedDelivery}
                </div>
                <div className="cart-summary-item">
                  <strong>Address:</strong>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                  />
                </div>
                <button className="checkout-button" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
              <div className="support-section">
                <h3>Support</h3>
                <p>If you need help, contact us at:</p>
                <p><a href="mailto:support@pos.com">support@example.com</a></p>
                <p>or call us at +91 9142856755.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
