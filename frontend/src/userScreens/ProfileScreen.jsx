import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify'
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlices';
import SideBar from '../components/SideBar/SideBar.jsx';
import '../UserCss/Profile.css'



import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth)
  const [updateProfile, { isLoading }] = useUpdateUserMutation()


  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email)

  }, [userInfo.setName, userInfo.setEmail]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');

    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          number,
          password
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated')
        navigate("/")
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }

    }
  }
  return (
    <div className="profile-container" style={{ marginTop: "6rem",  }}>
      <SideBar />
      <FormContainer>
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler}>
          <Container>
            <Row>
              <Col>
                <Form.Group className='my-2 ' controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter your Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='my-2' controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='my-2' controlId='number'>
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter your phone Number'
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='my-2' controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {isLoading && <Loader />}
          <Button type='submit' variant='primary' className='mt-3' >
            UPDATE
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default ProfileScreen;

