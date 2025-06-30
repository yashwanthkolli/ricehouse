import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../Components/BackButton/BackButton';
import LoginIcon from '../../Components/LoginIcon/LoginIcon';
import Menu from '../../Components/Menu/Menu';
import setAuthToken from '../../utils/setAuthToken';
import './Profile.Styles.scss';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { IoIosClose } from 'react-icons/io'
import Input from '../../Components/Input/Input';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('')
  const dialogRef = useRef()

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);
  
  useEffect(() => {
    const token = localStorage.token
    if(!token) return navigate('/');
    setAuthToken(JSON.parse(token));
    axios.get('https://ricehouse.in/backend/api/auth/user')
    .then(res => setUser(res.data))
    .catch(err => {
      toast("Failed to User Details", { 
        type: "error", 
        isLoading: false,
        autoClose: 5000
      });
    })
  }, [])
  
  const openDialog = () => setIsOpen(true) 
  const closeDialog = () => setIsOpen(false) 

  const handlePhoneChange = e => {
    setPhone(e.target.value)
  }

  const handleResetPassword = async () => {
    await axios.post('https://ricehouse.in/backend/api/auth/changepassword', { phone })
    .then(res => {
      setIsOpen(false)
      setPhone('')
      toast("Email sent Successfully", { 
        type: "success", 
        isLoading: false,
        autoClose: 5000
      });
    })
    .catch(err => {
      toast("Failed to Send Email", { 
        type: "error", 
        isLoading: false,
        autoClose: 5000
      });
    })
  };

  return (
    <div className='profile-page'>
      <div className='nav'>
          <BackButton />
          <Menu color='dark' />
          <LoginIcon color='dark' />
        </div>
        <div className='content'>
          <div className='user-details'>
            <p className='name'>{user.name}</p>
            <p className='email'>{user.phone}</p>
          </div>
          <div className='password'>
            Click the following buttton to get password reset link. You will recieve a mail with Password reset link. Please check your spam folder as well.
            <button className='button' onClick={openDialog}>Reset Password</button>
          </div>
          <div className='buttons'>
            <Link to='/cart'><button className='button'>View Cart</button></Link>
            <Link to='/orders'><button className='button'>Orders</button></Link>
          </div>
        </div>

        <dialog className='address-dialog' ref={dialogRef} onCancel={closeDialog}>
          <div className='content'>
            <div className='text'>Please enter the email accociated with the account. You will receive a password reset link. Please check your spam folder as well.</div>
            <Input
              value={phone}
              placeholder='Email'
              type='text'
              onChange={handlePhoneChange}
              white
            />
            <button className='order-button' onClick={handleResetPassword}>Reset Password</button>
          </div>
          <div className='close' onClick={closeDialog}>
            <IoIosClose />
          </div>
        </dialog>
    </div>
  )
}

export default Profile