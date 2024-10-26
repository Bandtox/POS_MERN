import React from 'react';
import '../CSS/Newsletter.css';
import newsletterImage from '../res/News.png'; // Import an image

const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <h2>Subscribe to Our Newsletter</h2>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>
      <div className="newsletter-image">
        <img src={newsletterImage} alt="Newsletter" />
      </div>
    </section>
  );
};

export default Newsletter;
