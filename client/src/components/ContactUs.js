import React from 'react';
import '../CSS/ContactUs.css';
import contactImage from '../res/Contact.png'; // Import an image

const ContactUs = () => {
  return (
    <section className="contact-us">
      <div className="contact-us-image">
        <img src={contactImage} alt="Contact Us" />
      </div>
      <div className="contact-us-form">
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
