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
      className='order-button'
    >
      {loading ? 'Processing...' : 'Pay with PhonePe'}
    </button>
  );
};

export default PaymentButton;