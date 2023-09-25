// components/VerifyOTP.js'
"use client"


import React, { useState } from 'react';
import axios from 'axios';

const VerifyOTP = () => {
    console.log(process.env.API_URL)
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [response, setResponse] = useState('');

  const verifyOTP = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verify-otp`, {
        email,
        otp,
      });
      setResponse('OTP verified successfully.');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setResponse('Error verifying OTP.');
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>OTP:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
      </div>
      <div>
        <button onClick={verifyOTP}>Verify OTP</button>
      </div>
      <p>{response}</p>
    </div>
  );
};

export default VerifyOTP;
