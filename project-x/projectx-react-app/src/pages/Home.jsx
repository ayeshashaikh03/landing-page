import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;