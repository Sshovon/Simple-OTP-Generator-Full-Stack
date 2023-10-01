// components/VerifyOTP.js
"use client"
import React, { useState } from 'react';
import axios from 'axios';

const VerifyOTP = () => {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [response, setResponse] = useState('');

  const verifyOTP = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-otp`,
        {
          email,
          otp,
        }
      );
      setResponse('OTP verified successfully.');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setResponse('Error verifying OTP.');
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">OTP:</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
      </div>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
          onClick={verifyOTP}
        >
          Verify OTP
        </button>
      </div>
      <p className="mt-4 text-red-600">{response}</p>
    </div>
  );
};

export default VerifyOTP;
