import React from 'react'
import ContactUsSection from '../../Components/ContactUsSection/ContactUsSection'

const ShippingPolicy = () => {
  return (
    <div className='policy-page'>
      <h1 className='title'>Shipping Policy</h1>
      <div className='text'>
        <p>This Shipping Policy ("<strong>Policy</strong>") is applicable to Undelivered Shipments. This Policy applies to all Orders placed with RiceHouse (herein after referred to as '<strong>RH</strong>' or '<strong>us</strong>' or '<strong>our</strong>' or '<strong>we</strong>') by you ("<strong>User</strong>", "<strong>you</strong>", "<strong>Buyer</strong>" or "<strong>your</strong>") through <a href="/">www.ricehouse.in</a> website and RiceHouse mobile application ("<strong>Platform</strong>").</p>
        <p>Any capitalized terms used herein this Policy and not defined explicitly shall have the same meaning as defined in the Terms of Use, as may be amended from time to time.</p>
        <p>We may modify this Policy from time to time, and any such changes will be reflected on the Platform and is effective immediately upon the changes being reflected on the Platform. If you do not agree to the terms contained in this Policy, you are advised not to accept the Terms of Use and this Policy and may forthwith leave and stop using the Platform. Users agree to be bound to any such changes or modifications and understand and accept the importance of regularly reviewing this Policy as updated on the Platform from time to time.</p>
        <h2>I. Delivery of Shipment to Buyer:</h2>
        <br />
        <ol>
          <li>
            <p>We or our third-party logistics partner will attempt to deliver the Shipment to the Buyer for a maximum of 1 (one) attempt. However, in case of the occurrence of any one of the following event during the first delivery attempt, we may make no more than one (1) attempt to deliver the Shipment:</p>
            <p>a. Address of the Consignee is not found to deliver the Shipment during the first attempt; or</p>
            <p>b. The Buyer has provided incorrect or incomplete shipping details.</p>
          </li>
          <li>
            <p>Despite our reasonable efforts to deliver the Shipment to the Buyer, in some cases, there may be a delivery failure for various reasons, including without limitation:</p>
            <p>a. Consignee refuses to take delivery of the Shipment;</p>
            <p>b. Consignee is not reachable/ unavailable at the delivery address to receive the Shipment;</p>
            <p>c. Consignee does not have enough cash to make payment for the Shipment; and/or</p>
            <p>d. Consignee requests for future delivery attempts.</p>
          </li>
        </ol>
        <p>(the Shipment in each of the above cases shall be referred to as "<strong>Undelivered Shipment</strong>")</p>
        <ol start="3">
          <li>In certain exceptional scenarios, or where the delivery location is in a non-serviceable zone, i.e., where we are not able to deliver due to unforeseen circumstances or service unavailability, for such Shipment we will not attempt delivery to Buyer, and such Shipment shall also be deemed to be an Undelivered Shipment for the purposes of this Policy.</li>
        </ol>
        <br />
        <h2>II. Process of Refund to the Buyer:</h2>
        <br />
        <ol>
        <li>
        <p>If the Buyer has made the payment in advance for the Products/ Services purchased at the time of placing the Order on the Platform and the Shipment is marked as Undelivered Shipment, the refund will be processed through the same channel of payment which was used by the Buyer to make the payment within 2 (two) business days;</p>
        </li>
        <li>
        <p>If the refund is not processed to the Buyer within 2 (two) working days, the Buyer can connect with our 'Customer Support' and report the concern;</p>
        </li>
        <li>
        <p>udaan will conduct a thorough investigation with our shipping partner to determine the cause of the delay or failure;</p>
        </li>
        <li>
        <p>A full refund will be processed to the Buyer's Account within 2 (two) working days from the date of refund request raised by the Buyer through the same channel of payment which was used by the Buyer to make the payment.</p>
        </li>
        </ol>
        <h2>III. Return and Refund of Products</h2>
        <br />
        <p>Return and Refund of Shipments shall be dealt with in accordance with Return Shipment Policy available here.</p>
      </div>
      <ContactUsSection />
    </div>
  )
}

export default ShippingPolicy