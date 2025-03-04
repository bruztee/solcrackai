import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import BuilderSection from '../components/BuilderSection';
import SolanaIntegration from '../components/SolanaIntegration';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <BuilderSection />
      <SolanaIntegration />
    </>
  );
};

export default HomePage;