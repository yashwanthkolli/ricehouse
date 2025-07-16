import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosClose } from 'react-icons/io'
import './Login.Styles.scss'

import signUpImg from '../../Assets/Login/signUp.jpg'
import Input from '../../Components/Input/Input'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [resetPhone, setResetPhone] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const dialogRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
      if (isOpen) {
        dialogRef.current?.showModal();
      } else {
        dialogRef.current?.close();
      }
    }, [isOpen]);
    
  const openDialog = () => setIsOpen(true) 
  const closeDialog = () => setIsOpen(false) 

  const handlePhoneChange = e => {
    setPhone(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleResetPhoneChange = e => {
    setResetPhone(e.target.value)
  }

  const handleLogin = async () => {
    const id = toast.loading('Please wait...')
    await axios
      .post(`https://ricehouse.in/backend/api/auth`, { phone, password })
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.data.token))
        toast.update(id, {
          render: 'Login Successful',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        })
        navigate('/')
      })
      .catch(err => {
        setPhone('')
        setPassword('')
        toast.update(id, {
          render: 'User not found! Create an account.',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        })
      })
  }

  const handleClose = () => {
    navigate(-1)
  }

  const handleResetPassword = async () => {
    await axios.post('https://ricehouse.in/backend/api/auth/changepassword', { phone: resetPhone })
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
    <div className='login-page'>
      <div className='contenty'>
        <div className='close' onClick={handleClose}>
          <IoIosClose />
        </div>
        <div className='img-container'>
          <img src={signUpImg} alt='login-img' />
          <div className='background'></div>
          <div className='welcome'>
            <h1 className='heading'>Welcome Back.</h1>
            <p className='text'>
              Please enter you credentials to explore the finest rice varieties
              and manage your account effortlessly.
            </p>
            <p className='text'>
              Don't have an account?{' '}
              <Link className='bold' to='/signup'>
                Create One
              </Link>
            </p>
          </div>
        </div>
        <div className='login-container'>
          <div className='logo-container'>Rice House</div>
          <div className='inputs'>
            <Input
              value={phone}
              placeholder='Email'
              type='text'
              onChange={handlePhoneChange}
            />
            <Input
              value={password}
              placeholder='Password'
              type={passwordVisible ? 'text' : 'password'}
              onChange={handlePasswordChange}
              icon={passwordVisible ? <FaEyeSlash onClick={() => setPasswordVisible(prev => !prev)} /> : <FaEye onClick={() => setPasswordVisible(prev => !prev)} />}
            />
            <div className='forgot-password-container'>
              <button className='forgot-password' onClick={openDialog}>Forgot Password</button>
            </div>
          </div>
          <div className='buttons-container'>
            <button className='button' onClick={handleLogin}>
              Login
            </button>
          </div>
          {/* <div className='space'>
            <div className='line'></div>
            <div className='text'>or</div>
          </div>
          <button className='googleLogin' onClick={loginWithGoogle}>
            <FcGoogle className='icon' /> Continue with Google
          </button> */}
        </div>
      </div>
      <dialog className='address-dialog' ref={dialogRef} onCancel={closeDialog}>
          <div className='content'>
            <div className='text'>Please enter the email accociated with the account. You will receive a password reset link. Please check your spam folder as well.</div>
            <Input
              value={resetPhone}
              placeholder='Email'
              type='text'
              onChange={handleResetPhoneChange}
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

export default Login
