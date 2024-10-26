import React from 'react';
import '../CSS/Offers.css';
import tenPercentOff from '../res/10.jpg';
import BuyGet from '../res/Buyget.jpg';
import Enter from '../res/Enter.jpg'; 

const Offers = () => {
  return (
    <section className="offers">
      <h2 className="offers-title">Special Offers</h2>
      <div className="offers-grid">
        {/* Image Offer Cards */}
        <div className="offer-card">
          <img src={BuyGet} alt="Buy 1 Get 1 Free" className="offer-image" />
        </div>
        <div className="offer-card">
          <img src={tenPercentOff} alt="10% off" className="offer-image" />
        </div>
        <div className="offer-card">
          <img src={Enter} alt="Buy 1 Get 1 Free" className="offer-image" />
        </div>
      </div>
    </section>
  );
};

export default Offers;
