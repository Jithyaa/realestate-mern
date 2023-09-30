import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import the toast library
import '../UserCss/ForgotOtp.css';
import axios from 'axios';

const ForgotOtp = () => {
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/users/verify-otp', { email, otp });
      
      if (response.data.success) {
        navigate('/reset-password');
      } else {
        toast.error('OTP does not match');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error verifying OTP');
    }
  };

  return (
    <div className='otp-container'>
      <div className='form-container4'>
        <h2>Verify OTP</h2>
        <p>Enter the OTP sent to {email}</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="otp">
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Verify OTP
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgotOtp;