import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import '../UserCss/ResetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      return;
    }

    try {
      
      const response = await axios.post('/api/reset-password', { newPassword: String(password) });
      if (response.data.success) {
        setMessage('Password reset successfully. Login with your new password.');
        navigate('/login'); 
      } else {
        setMessage('Error resetting password. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Error resetting password. Please try again.');
      console.log('Error response:', error.response); 
      console.log('Error message:', error.message);
    }
  };
  return (
    <div className='reset-container'>
      <div className='form-container3'>
        <h2>Reset Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        <p style={{ color: 'black' }}><b>{message}</b></p>
      </div>
    </div>
  );
};

export default ResetPassword;
