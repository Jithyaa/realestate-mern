import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/usersApiSlices';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import '../UserCss/LoginScreen.css';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='main-container'>
       <div className="login-container">
      <div className="form-container1">
        <h4 style={{color:'black'}}><b>Sign into your account</b></h4>
        <form onSubmit={submitHandler}>
          
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {isLoading && <Loader />}
          <button type="submit">SIGN IN</button>
        </form>
        {/* <div style={{ color: 'black', fontSize: '17px' }} className="py-3">
          <b>Forgot Password? </b> <Link style={{color:'hsl(240, 100%, 40%)'}} to="/forgot-password"><b>Reset it here</b></Link>
        </div> */}
        <p style={{color:'black',fontSize:'18px'}} className="py-3"><b>Create an account? </b>
           <Link style={{color:'hsl(240, 100%, 40%)'}} to="/register"><b>SIGN UP</b></Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default LoginScreen;