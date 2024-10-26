import React from 'react';
import Banner from './Banner';
import Offers from './Offers';
import Newsletter from './Newsletter';
import ContactUs from './ContactUs';
import Footer from './Footer';
import '../CSS/UserHomePage.css';
import Image1 from '../res/Asian.jpg'; // Replace with your actual image paths
import Image4 from '../res/Japanese.jpg';
import Image6 from '../res/Burger.jpg';
import Image2 from '../res/Indian.jpg';
import Image5 from '../res/Chinese.png';
import Image3 from '../res/Maxican.jpg';

const UserHomePage = () => {
  // Sample image URLs for the first banner (3 images)
  const firstBannerImages = [
    Image1,
    Image2,
    Image3,
  ];

  // Sample image URLs for the second banner (3 images)
  const secondBannerImages = [
    Image4,
    Image5,
    Image6,
  ];

  return (
    <>
      <Banner images={firstBannerImages} /> {/* First Banner */}
      <Offers />
      <Newsletter />
      <Banner images={secondBannerImages} /> {/* Second Banner */}
      <ContactUs />
      <Footer />
    </>
  );
};

export default UserHomePage;
