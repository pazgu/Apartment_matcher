import React from 'react';
import Section from './Section';
import Reviews from './HomePage-Reviews';
import ImageSection from './ImageSection';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Section/>
      <ImageSection/>
      <Reviews/>
    </div>
  );
};

export default Home;
