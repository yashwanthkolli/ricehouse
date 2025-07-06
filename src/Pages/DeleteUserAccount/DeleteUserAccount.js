import React, { useState } from 'react';
import axios from 'axios';
import './DeleteUserAccount.Styles.scss';

const DeleteAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', error: false });

  const handleDelete = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', error: false });

    try {
      const res = await axios.post('https://ricehouse.in/backend/api/users/delete', { phone: email, password });
      setStatus({ loading: false, message: res.data.message, error: false });
      setEmail('');
      setPassword('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      setStatus({ loading: false, message: msg, error: true });
    }
  };

  return (
    <div className="delete-container">
      <div className="delete-box">
        <h2 className="delete-title">Delete Account</h2>

        <form onSubmit={handleDelete} className="delete-form">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />

          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />

          <button type="submit" className="form-button" disabled={status.loading}>
            {status.loading ? 'Deleting...' : 'Delete Account'}
          </button>

          {status.message && (
            <div className={`form-message ${status.error ? 'error' : 'success'}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;