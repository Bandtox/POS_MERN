import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Register.css';
import RegisterImage from '../res/pos.jpg';

const Register = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '', country: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost/api/auth/register', user);
            setSuccessMessage('User registered, please sign in');
            setErrorMessage(''); // Clear any previous error message

            // Clear the input fields
            setUser({ name: '', email: '', password: '', country: '' });
        } catch (err) {
            setErrorMessage(err.response?.data || 'An error occurred'); // Set error message from response or default
            setSuccessMessage(''); // Clear any previous success message
        }
    };

    return (
        <div className='register-page'>
            <div className="register-container">
                <div className="register-form">
                    <h2>Get started</h2>
                    <p>Already have an account? <a href="/login">Sign in</a></p>
                    {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            value={user.name}
                            onChange={handleChange} 
                        />
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
                        <input 
                            type="text" 
                            name="country" 
                            placeholder="Country" 
                            value={user.country}
                            onChange={handleChange} 
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="register-side">
                    <img src={RegisterImage} alt="Register" />
                </div>
            </div>
        </div>
    );
};

export default Register;
