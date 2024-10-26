import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [productCuisineType, setProductCuisineType] = useState('');
  const [productImageUrl, setProductImageUrl] = useState(''); // New state for image URL

  const [editProductId, setEditProductId] = useState(null);
  const [editProductName, setEditProductName] = useState('');
  const [editProductPrice, setEditProductPrice] = useState(0);
  const [editProductDescription, setEditProductDescription] = useState('');
  const [editProductCuisineType, setEditProductCuisineType] = useState('');
  const [editProductImageUrl, setEditProductImageUrl] = useState(''); // New state for editing image URL

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost/api/inventory/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      const newProduct = {
        name: productName,
        price: productPrice,
        description: productDescription,
        cuisineType: productCuisineType,
        imageUrl: productImageUrl // Include image URL
      };
      await axios.post('http://localhost/api/inventory/product', newProduct);
      setProductName('');
      setProductPrice(0);
      setProductDescription('');
      setProductCuisineType('');
      setProductImageUrl(''); // Reset image URL
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost/api/inventory/product/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateProduct = async () => {
    try {
      const updatedProduct = {
        name: editProductName,
        price: editProductPrice,
        description: editProductDescription,
        cuisineType: editProductCuisineType,
        imageUrl: editProductImageUrl // Include image URL for update
      };
      await axios.put(`http://localhost/api/inventory/product/${editProductId}`, updatedProduct);
      setEditProductId(null);
      setEditProductName('');
      setEditProductPrice(0);
      setEditProductDescription('');
      setEditProductCuisineType('');
      setEditProductImageUrl(''); // Reset editing image URL
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const startEditing = (product) => {
    setEditProductId(product._id);
    setEditProductName(product.name);
    setEditProductPrice(product.price);
    setEditProductDescription(product.description);
    setEditProductCuisineType(product.cuisineType);
    setEditProductImageUrl(product.imageUrl); // Set image URL for editing
  };

  const cancelEditing = () => {
    setEditProductId(null);
    setEditProductName('');
    setEditProductPrice(0);
    setEditProductDescription('');
    setEditProductCuisineType('');
    setEditProductImageUrl(''); // Reset editing image URL
  };

  // Group products by cuisine type
  const groupedProducts = products.reduce((acc, product) => {
    const cuisine = product.cuisineType || 'Uncategorized';
    if (!acc[cuisine]) {
      acc[cuisine] = [];
    }
    acc[cuisine].push(product);
    return acc;
  }, {});

  return (
    <div className="inventory-container">
      <h2 className="title">Inventory</h2>
      
      <div className="add-product-form">
        <h3 className="form-title">Add Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Price (INR)"
          value={productPrice}
          onChange={(e) => setProductPrice(Number(e.target.value))}
          className="input-field"
        />
        <textarea
          placeholder="Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Cuisine Type"
          value={productCuisineType}
          onChange={(e) => setProductCuisineType(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={productImageUrl}
          onChange={(e) => setProductImageUrl(e.target.value)} // Image URL input for adding product
          className="input-field"
        />
        <button onClick={addProduct} className="add-button">Add Product</button>
      </div>

      <div className="products-list">
        <h3 className="list-title">Products</h3>
        {Object.keys(groupedProducts).map((cuisine) => (
          <div key={cuisine} className="cuisine-group">
            <h4 className="cuisine-title">{cuisine}</h4>
            <ul>
              {groupedProducts[cuisine].map((product) => (
                <li key={product._id} className="product-item">
                  {editProductId === product._id ? (
                    <div className="edit-form">
                      <input
                        type="text"
                        value={editProductName}
                        onChange={(e) => setEditProductName(e.target.value)}
                        className="input-field"
                      />
                      <input
                        type="number"
                        value={editProductPrice}
                        onChange={(e) => setEditProductPrice(Number(e.target.value))}
                        className="input-field"
                      />
                      <textarea
                        value={editProductDescription}
                        onChange={(e) => setEditProductDescription(e.target.value)}
                        className="input-field"
                      />
                      <input
                        type="text"
                        value={editProductCuisineType}
                        onChange={(e) => setEditProductCuisineType(e.target.value)}
                        className="input-field"
                      />
                      <input
                        type="text"
                        value={editProductImageUrl}
                        onChange={(e) => setEditProductImageUrl(e.target.value)} // Image URL input for editing product
                        className="input-field"
                      />
                      <button onClick={updateProduct} className="save-button">Save</button>
                      <button onClick={cancelEditing} className="cancel-button">Cancel</button>
                    </div>
                  ) : (
                    <div className="product-info">
                      <img src={product.imageUrl} alt={product.name} className="product-image" /> {/* Display product image */}
                      {product.name} - Price: ₹{product.price} - {product.description} - Cuisine: {product.cuisineType}
                      <div className="button-group">
                        <button onClick={() => startEditing(product)} className="edit-button">Edit</button>
                        <button onClick={() => deleteProduct(product._id)} className="delete-button">Delete</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
