import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';
import RegisterImage from '../res/Internet.jpg';

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost/api/auth/login', user);
            localStorage.setItem('token', res.data.token);
            if (res.data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } catch (err) {
            setError(err.response?.data || 'An error occurred'); // Set error message from response or default
        }
    };

    return (
        <div className='login-page'>
            <div className="login-container">
                <div className="login-form">
                    <h2>Sign in</h2>
                    <p>Don't have an account? <a href="/register">Sign up</a></p>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={user.email}
                            onChange={handleChange} 
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={user.password}
                            onChange={handleChange} 
                        />
                        {error && <p className="error-message">{error}</p>} {/* Display error message */}
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div className="login-side">
                    <img src={RegisterImage} alt="Login" />
                </div>
            </div>
        </div>
    );
};

export default Login;
