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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/generate-otp`,
        {
          email,
        }
      );
      console.log(response);
      setOTP(response.data.otp);
      setResponse('OTP generated successfully.');
    } catch (error) {
      console.error('Error generating OTP:', error);
      setResponse('Error generating OTP.');
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Generate OTP</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
          onClick={generateOTP}
        >
          Generate OTP
        </button>
      </div>
      {otp && (
        <div className="mt-4">
          <p className="font-semibold">Generated OTP:</p>
          <p className="text-xl">{otp}</p>
          <p className="mt-2">{response}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateOTP;
