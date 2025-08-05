import './UniversalContactSection.Styles.scss'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp } from "react-icons/fa6";

const UniversalContactSection = () => {
  return (
    <div className='uni-contact'>
      <p className='text'>Order Now</p>
      <a className='whatsapp' href='https://wa.me/919916835143' rel='noreferrer'>
        <FaWhatsapp className='link' />
      </a>
      <a className='call' href='tel:9916835143' rel='noreferrer'>
        <FiPhone className='link' />
      </a>
      {/* <a
        className='location'
        href='https://maps.app.goo.gl/am1prqMjPrST6z4y9'
        target='_blanck'
        rel='noreferrer'
      >
        <FiMapPin className='link' />
      </a>
      <a className='mail' href='mailto:ricehouse.blr@gmail.com' rel='noreferrer'>
        <FiMail className='link' />
      </a> */}
    </div>
  )
}

export default UniversalContactSection