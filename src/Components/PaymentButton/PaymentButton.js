// components/PaymentButton.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentButton = ({ cartItems, totalAmount, address, phone, userId }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Initiate PhonePe payment
      const paymentResponse = await axios.post('https://ricehouse.in/backend/api/payment/initiate', {
        amount: totalAmount,
        userId, 
        address,
        phone,
        products: cartItems
      });
      
      console.log(paymentResponse.data)
      // Redirect to PhonePe payment page
      window.location.href = paymentResponse.data.checkoutUrl;
    } catch (error) {
      console.error('Payment error:', error);
      navigate('/payment-error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {loading ? 'Processing...' : 'Pay with PhonePe'}
    </button>
  );
};

export default PaymentButton;