import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Inventory from './Inventory';
import Transaction from './Transaction';
import Dashboard from './Dashboard';

const Admin = () => {
    return (
        <div>
            <Navbar />
            <div className="admin-content">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/transactions" element={<Transaction />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;
