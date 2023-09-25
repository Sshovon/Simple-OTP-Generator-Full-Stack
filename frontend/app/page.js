// pages/index.js
import React from 'react';
import GenerateOTP from '../components/GenerateOTP';
import VerifyOTP from '../components/VerifyOTP';

const Home = () => {
  return (
    <div>
      <GenerateOTP />
      <VerifyOTP />
    </div>
  );
};

export default Home;
