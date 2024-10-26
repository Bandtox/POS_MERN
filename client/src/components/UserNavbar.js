import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/UserNavbar.css';

const UserNavbar = () => {
    const navigate = useNavigate(); // Using useNavigate for redirection

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/login'); // Redirect to the login page
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/home/">POS</Link>
            </div>
            <ul className="navbar-right">
                <li><Link to="/home/products">Products</Link></li>
                <li><Link to="/home/profile">Profile</Link></li>
                <li><Link to="/home/cart">Cart</Link></li>
                <li>
                    <button onClick={handleLogout} className="logout">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default UserNavbar;
