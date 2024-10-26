import React from 'react';
import '../CSS/Footer.css'; 
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
        <ul className="footer-links">
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="footer-right">
        <div className="social-links">
          <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://www.twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
