import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/UserNavbar.css';

const UserNavbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                POS
            </div>
            <ul className="navbar-right">
                <li><Link to="/home/products">Products</Link></li>
                <li><Link to="/home/profile">Profile</Link></li>
                <li><Link to="/home/cart">Cart</Link></li>
            </ul>
        </nav>
    );
};

export default UserNavbar;
