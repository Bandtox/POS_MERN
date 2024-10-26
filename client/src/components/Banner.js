import React from 'react';
import Slider from 'react-slick';
import '../CSS/Banner.css';

const Banner = ({ images }) => {  // Accept images as a prop
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div className="banner">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
