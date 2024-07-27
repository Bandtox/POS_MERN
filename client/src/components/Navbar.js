import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="navbar">
            <div className="navbar-title">Admin</div>
            <ul className="navbar-menu">
                <li><Link to="/admin">Dashboard</Link></li>
                <li><Link to="/admin/inventory">Inventory</Link></li>
                <li><Link to="/admin/transactions">Transactions</Link></li>
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;
