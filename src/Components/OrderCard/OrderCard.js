import React, { useEffect, useState } from 'react'

import './OrderCard.Styles.scss'
import axios from 'axios'
import { toast } from 'react-toastify'

const OrderCard = ({order}) => {
  const [totalQuantity, setTotalQuantity] = useState(0)

  useEffect(() => {
    let quantity = order.products.reduce((acc, cur) => {
      return acc + cur.quantity
    }, 0)
    setTotalQuantity(quantity)
  },[])
  
  return (
    <div className='order-card'>
      <div className='header'>
        <span className='date'>{order.createdAt.substring(0, 10)}</span>
        <span className='delivery-status'>Delivery Status: {order.deliveryStatus}</span>
      </div>
      <div className='product-details'>
        {
          order.products.map(product => 
            <OrderedProduct key={product.name} prod={product} totalQuantity={totalQuantity} />
          )
        }
      </div>
      <div className='other-details'>
        <div className='address'>
          <p>Address: </p>
          <p>{order.address}</p>
          <p>{order.phone}</p>
        </div>
        <div className='payment'>
          <p>Transaction Id: {order.phonepeTransactionId}</p>
          <p>Transaction Method: {order.paymentMethod}</p>
          <p className='amount'>Amount: ₹.{order.amount}</p>
        </div>
      </div>
    </div>
  )
}

const OrderedProduct = ({prod, totalQuantity}) => {
  const [product, setProduct] = useState({})

  useEffect(() => {
    axios.get(`https://ricehouse.in/backend/api/prod/${prod.prodId}`)
    .then(res => setProduct(res.data))
    .catch(err => {
      toast("Failed to Load Cart", { 
        type: "error", 
        isLoading: false,
        autoClose: 5000
      });
    })
  }, [])

  return(
    <div className='cart-card'>
      <div className='img-container'>
        <img src={product.imgUrl} alt={product.prodId} />
      </div>
      <div className='title'>
        <h1 className='heading'>{product.name}</h1>
        <h4 className='sub-heading'>₹ {totalQuantity < 10 ? product.retail : product.wholesale}</h4>
      </div>
      <div className='quantity'>
        {prod.quantity}
      </div>
      <div className='prices'>
        ₹ { totalQuantity < 10 ? prod.retail*prod.quantity : prod.wholesale*prod.quantity }
      </div>
    </div>
  )
}


export default OrderCard