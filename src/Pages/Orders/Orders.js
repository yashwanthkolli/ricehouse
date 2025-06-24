import React, { useEffect, useState } from 'react'
import BackButton from '../../Components/BackButton/BackButton'
import LoginIcon from '../../Components/LoginIcon/LoginIcon'
import Menu from '../../Components/Menu/Menu'
import { toast } from 'react-toastify'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

import './Orders.Styles.scss'

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

  console.log(orders)
  return (
    <div className='orders-page'>
      <div className='nav'>
        <BackButton />
        <Menu color='dark' />
        <LoginIcon color='dark' />
      </div>
      <div className='content'>
        {
          orders || orders.lenght > 0 ?
          <div className='orders-container'>
            {
              orders.map(order => 
                <div className='order'>{order.amount}{order.status}</div>
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