import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './ResetPassword.Styles.scss'
import Input from '../../Components/Input/Input';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tokenValid, setTokenValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check token validity when component mounts
  useEffect(() => {
    const checkToken = async () => {
      await axios.get(`https://ricehouse.in/backend/api/auth/checkresettoken/${resetToken}`)
      .then(res => {
        setTokenValid(true)
      })
      .catch(err => {
        setTokenValid(false)
        toast("Invalid Token", { 
          type: "error", 
          isLoading: false,
          autoClose: 5000
        });
        // navigate('/')
      })
    };
    checkToken();
  }, [resetToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("Passwords don't match", { 
        type: "error", 
        isLoading: false,
        autoClose: 5000
      });
      return;
    }

    await axios.put(`https://ricehouse.in/backend/api/auth/resetpassword/${resetToken}`, {password})
    .then(res => {
      toast("Password reset successfull", { 
        type: "success", 
        isLoading: false,
        autoClose: 5000
      });
      setTimeout(() => navigate('/login'), 2000);
    })
    .catch(err => {
      toast("Passwords couldn't be changed right now. Please try later.", { 
        type: "error", 
        isLoading: false,
        autoClose: 5000
      });
    })
  };

  if (tokenValid === null) {
    return <div>Checking token...</div>;
  }

  if (!tokenValid) {
    return (
      <div>
        <h2>Reset Password</h2>
        <p style={{ color: 'red' }}>Token in not valid</p>
        <button onClick={() => navigate('/auth/forgotpassword')}>
          Request new reset link
        </button>
      </div>
    );
  }

  return (
    <div className='reset-password-page'>
      <h2 className='heading'>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <Input 
          placeholder='Password' 
          type='password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          white 
        />
        <Input 
          placeholder='Confirm Password' 
          type='password' 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} 
          white 
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;