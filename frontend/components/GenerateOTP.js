// components/GenerateOTP.js
"use client"

import React, { useState } from 'react';
import axios from 'axios';

const GenerateOTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [response, setResponse] = useState('');

  const generateOTP = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/generate-otp`, {
        email,
      });
      console.log(response)
      setOTP(response.data.otp);
      setResponse('OTP generated successfully.');
    } catch (error) {
      console.error('Error generating OTP:', error);
      setResponse('Error generating OTP.');
    }
  };

  return (
    <div>
      <h2>Generate OTP</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button onClick={generateOTP}>Generate OTP</button>
      </div>
      {otp && (
        <div>
          <p>Generated OTP: {otp}</p>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateOTP;
