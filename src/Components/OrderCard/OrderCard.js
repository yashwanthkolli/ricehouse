import React from 'react'

import './OrderCard.Styles.scss'

const OrderCard = ({order}) => {
  console.log(order)
  return (
    <div className='order-card'>
      <div className='header'>
        <span className='date'>{order.createdAt.substring(0, 10)}</span>
        <span className='delivery-status'>Delivery Status: {order.deliveryStatus}</span>
      </div>
      <div className='product-details'>
      {
        order.products.map(product => 
          <div>
            <span>{product.name}</span>
            <span>{product.quantity}</span>
          </div>
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

export default OrderCard