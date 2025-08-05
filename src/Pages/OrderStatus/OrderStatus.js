import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BackButton from '../../Components/BackButton/BackButton'
import Menu from '../../Components/Menu/Menu'
import LoginIcon from '../../Components/LoginIcon/LoginIcon'
import axios from 'axios'
import { toast } from 'react-toastify';

import './OrderStatus.Styles.scss'

const OrderStatus = () => {
  const { orderId } = useParams()
  const [paymentDetails, setPaymentDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://ricehouse.in/backend/api/payment/status/${orderId}`)
    .then(res => {
      setPaymentDetails(res.data)
      setLoading(false)
    })
    .catch(err => {
      setLoading(false);
      toast("Cannot Load Order Details", { 
        type: "error", 
        isLoading: false,
        autoClose: 5000
      });
    })
  },[])

  console.log(paymentDetails)

  return (
    <div className='order-status-page'>
      <div className='nav'>
        <BackButton />
        <Menu color='dark' />
        <LoginIcon color='dark' />
      </div>
      <div className='content'>
        {
          loading ? <div>Loading...</div> 
          :
          <div>
            {
              paymentDetails.status && paymentDetails.status === 'COMPLETED' ?
              <p>Your payment has been completed. Your order has been placed. OrderId: {orderId}</p>
              :
              <p>Your payment has been <span className='error'>failed</span>. Your order is not complete. Please try again!</p>
            }
            <div className='links'>
              <Link to='/'>Shop Again</Link>
              <Link to='/orders'>Orders</Link>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default OrderStatus