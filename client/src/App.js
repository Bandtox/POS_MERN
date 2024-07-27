import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <div className="content">
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home/*" element={<ProtectedRoute element={<Home />} />} />
              <Route path="/admin/*" element={<ProtectedRoute element={<Admin />} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
