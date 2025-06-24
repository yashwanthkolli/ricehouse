import React, { useEffect, useState } from 'react'
import BackButton from '../../Components/BackButton/BackButton'
import LoginIcon from '../../Components/LoginIcon/LoginIcon'
import Menu from '../../Components/Menu/Menu'
import { toast } from 'react-toastify'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

import './Orders.Styles.scss'
import OrderCard from '../../Components/OrderCard/OrderCard'

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const token = localStorage.token
    setAuthToken(JSON.parse(token));
    axios.get('https://ricehouse.in/backend/api/order/')
    .then(res => {
      setOrders(res.data)
    })
    .catch(err => {
      toast("Failed to Load Orders", { 
        type: "error", 
        isLoading: false,
        autoClose: 5000
      });
    })
  }, [])

  return (
    <div className='orders-page'>
      <div className='nav'>
        <BackButton />
        <Menu color='dark' />
        <LoginIcon color='dark' />
      </div>
      <div className='content'>
        {
          orders || orders.length > 0 ?
          <div className='orders-container'>
            {
              orders.map(order => 
                <OrderCard key={order._id} order={order} />
              )
            }
          </div>
          :
          <div>No Orders Placed...</div>
        }
      </div>
    </div>
  )
}

export default Orders