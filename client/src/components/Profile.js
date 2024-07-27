// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Profile.css'; // Import your CSS file for styling

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
                const response = await axios.get('/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (err) {
                setError('Error fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            {user ? (
                <div className="profile-details">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Country:</strong> {user.country}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default Profile;
