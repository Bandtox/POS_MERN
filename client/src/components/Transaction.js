import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Transaction.css';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    cart: [],
    total: 0,
    address: '',
    expectedDelivery: '',
    date: ''
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost/api/transactions/${id}`, formData);
      const response = await axios.get('http://localhost/api/transactions');
      setTransactions(response.data);
      setEditingTransaction(null);
      setFormData({
        cart: [],
        total: 0,
        address: '',
        expectedDelivery: '',
        date: ''
      });
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost/api/transactions/${id}`);
      const response = await axios.get('http://localhost/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction._id);
    setFormData({
      cart: transaction.cart,
      total: transaction.total,
      address: transaction.address,
      expectedDelivery: transaction.expectedDelivery,
      date: transaction.date
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="transaction-container">
      <h2>All Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id} className="transaction-item">
            <p>Total Sales: ₹{transaction.total}</p>
            <p>Address: {transaction.address}</p>
            <p>Expected Delivery: {transaction.expectedDelivery}</p>
            <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
            <button onClick={() => handleEdit(transaction)}>Edit</button>
            <button onClick={() => handleDelete(transaction._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingTransaction && (
        <div className="edit-form">
          <h3>Edit Transaction</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editingTransaction);
            }}
          >
            <label>
              Total:
              <input
                type="number"
                name="total"
                value={formData.total}
                onChange={handleChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </label>
            <label>
              Expected Delivery:
              <input
                type="text"
                name="expectedDelivery"
                value={formData.expectedDelivery}
                onChange={handleChange}
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date.split('T')[0]} // Convert ISO date to YYYY-MM-DD
                onChange={handleChange}
              />
            </label>
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Transaction;
