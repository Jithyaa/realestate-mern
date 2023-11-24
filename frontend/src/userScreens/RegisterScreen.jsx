import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlices';
import '../UserCss/RegisterScreen.css';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else if (!validatePassword(password)) {
      toast.error('Password must be at least 6 characters, include one uppercase letter, and one number');
    } else {
      try {
        const res = await register({ name, email, number, password }).unwrap();
        localStorage.setItem('tempInfo', JSON.stringify({email}));
        toast.success('OTP sent successfully');
        navigate('/otp-verification',{ state: { email:res.email } });
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleEmailChange =(e)=>{
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   
    if(!enteredEmail){
      setEmailError('Email is required');
    }else if(!emailRegex.test(enteredEmail)){
      setEmailError('Invalid email format');
    }else{
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };


  return (
    <div className="register-container">
      <div className="form-container">
        <h3 style={{ color: 'black' }}><b>Create an account</b></h3>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <p style={{color:'white'}}>{emailError}</p> }
          <input
            type="text"
            placeholder="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (!validatePassword(e.target.value)) {
                setPasswordError('Password must be at least 6 characters, include one uppercase letter, and one number');
              } else {
                setPasswordError('');
              }
            }}
            required
          />
        {passwordError && <p style={{ color: 'white' }}>{passwordError}</p>}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {isLoading && <Loader />}
          <button type="submit" disabled={!!emailError || !!passwordError}>SIGN UP</button>
        </form>
        <p style={{ color: 'black' }} className="py-3"><b>Already have an account? </b>
          <Link style={{color:'white'}} to="/login"><b>SIGN IN</b></Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
