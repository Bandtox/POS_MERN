import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Products.css';

const Products = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost/api/inventory/products');
      const productsData = response.data;
      setProducts(productsData);

      // Extract and set unique cuisines for the sidebar
      const uniqueCuisines = Array.from(new Set(productsData.map(product => product.cuisine)));
      setCuisines(uniqueCuisines);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCuisineClick = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  // Filter products based on selected cuisine
  const filteredProducts = selectedCuisine === 'All'
    ? products
    : products.filter(product => product.cuisine === selectedCuisine);

  return (
    <div className="products-container">
      <div className="cuisines-sidebar">
        <h2>Cuisines</h2>
        <ul>
          <li onClick={() => handleCuisineClick('All')} className={selectedCuisine === 'All' ? 'selected' : ''}>All</li>
          {cuisines.map((cuisine) => (
            <li key={cuisine} onClick={() => handleCuisineClick(cuisine)} className={selectedCuisine === cuisine ? 'selected' : ''}>{cuisine}</li>
          ))}
        </ul>
      </div>

      <div className="products-content">
        {/* Dynamic title based on selected cuisine */}
        <h1 className="products-title">
          {selectedCuisine === 'All' ? 'Our Products' : `${selectedCuisine} Products`}
        </h1>
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h2>{product.name}</h2>
                <p>Price: ₹{product.price}</p>
                <p>{product.description}</p>
                <div className="product-options">
                  <label htmlFor={`quantity-${product._id}`}>Quantity:</label>
                  <input type="number" id={`quantity-${product._id}`} min="1" defaultValue="1" />
                  <label htmlFor={`spice-level-${product._id}`}>Spice Level:</label>
                  <select id={`spice-level-${product._id}`}>
                    <option value="mild">Mild</option>
                    <option value="medium">Medium</option>
                    <option value="hot">Hot</option>
                    <option value="extra-hot">Extra Hot</option>
                  </select>
                  <button
                    className="add-to-cart-button"
                    onClick={() => {
                      const quantity = parseInt(document.getElementById(`quantity-${product._id}`).value, 10);
                      const spiceLevel = document.getElementById(`spice-level-${product._id}`).value;
                      onAddToCart(product, quantity, spiceLevel);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available for this cuisine.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
