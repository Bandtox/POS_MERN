import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import Products from './Products';
import Profile from './Profile';
import Cart from './Cart';
import '../CSS/Home.css';

const Home = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState('');

  const handleAddToCart = (product, quantity, spiceLevel) => {
    const productWithDetails = { ...product, quantity, spiceLevel };
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity, spiceLevel }
            : item
        );
      } else {
        return [...prevCart, productWithDetails];
      }
    });
  };

  const handleRemoveItem = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== itemId));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleUpdateSpiceLevel = (itemId, newSpiceLevel) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === itemId
          ? { ...item, spiceLevel: newSpiceLevel }
          : item
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const calculateExpectedDelivery = () => {
    const currentTime = new Date();
    const preparationTime = 20; // minutes
    const deliveryTime = 20; // minutes
    const totalMinutes = preparationTime + deliveryTime;
    currentTime.setMinutes(currentTime.getMinutes() + totalMinutes);
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <UserNavbar />
      <div className="admin-content">
        <Routes>
          <Route 
            path="/" 
            element={<Products onAddToCart={handleAddToCart} />} 
          />
          <Route 
            path="/products" 
            element={<Products onAddToCart={handleAddToCart} />} 
          />
          <Route 
            path="/profile" 
            element={<Profile />} 
          />
          <Route 
            path="/cart" 
            element={<Cart 
                        cart={cart} 
                        expectedDelivery={calculateExpectedDelivery()} 
                        address={address}
                        setAddress={setAddress}
                        onRemoveItem={handleRemoveItem} 
                        onUpdateQuantity={handleUpdateQuantity} 
                        onUpdateSpiceLevel={handleUpdateSpiceLevel} 
                        onClearCart={handleClearCart} // Pass the handleClearCart function
                      />} 
          />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
