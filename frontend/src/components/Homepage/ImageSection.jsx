import React from 'react';
import './ImageSection.css';
import houseImage from '../../assets/hpimg.jpeg'; 

const ImageSection = () => {
  return (
    <section className="image-section">
      <img src={houseImage} alt="House" />
    </section>
  );
};

export default ImageSection;
