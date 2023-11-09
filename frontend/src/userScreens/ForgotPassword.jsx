import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../UserCss/ForgotScreen.css'
import { toast } from 'react-toastify';

import axios from 'axios';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send an HTTP POST request to your backend to send the password reset email
      const response = await axios.post('/api/users/send-reset-email', { email });


      if (response.data.success) {
        navigate(`/forgot-otp?email=${email}`);
        toast.success('OTP sent successfully');
      } else {
        console.error('Error sending email: ' + response.data.error);
        toast.error('Error sending email');
      }
    } catch (err) {
      console.error('Error sending email: ' + err.message);
      toast.error('Error sending email');
    }
  };

  return (
    <div className='forgot-container'>
      <div className='form-container2'>
        <h4 style={{ color: 'black' }}><b>Forgot Password</b></h4>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;