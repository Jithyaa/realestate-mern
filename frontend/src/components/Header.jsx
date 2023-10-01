import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation, useLoginMutation } from '../slices/usersApiSlices';
import { logout } from '../slices/authSlice';
import '../UserCss/Header.css'
import AddPropertyModal from './AddPropertyModal/AddPropertyModal';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();


  const [modalOpened, setModalOpened] = useState(false)

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const [validateLogin] = useLoginMutation()

  const handleAddPropertyClick = () => {
    if(validateLogin()){
      setModalOpened(true);
    }

  }

  return (
    <header>
      <Navbar variant='light' expand='lg' collapseOnSelect className='custom-navbar'>
        <div className='container'>
          <Navbar.Brand href='/'>HOMES.COM</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <Nav.Link href='/properties' className='header-link'>
                    Residencies
                  </Nav.Link>
                  {/* <Nav.Link href='/buy' className='header-link'>
                    Buy
                  </Nav.Link>
                  <Nav.Link href='/rent' className='header-link'>
                    Rent
                  </Nav.Link> */}
                  <Nav.Link href='' className='header-link' onClick={handleAddPropertyClick}>
                    Add your Property
                  </Nav.Link>
                  <AddPropertyModal
                    opened={modalOpened}
                    setOpened={setModalOpened}
                  />

                  <NavDropdown title={userInfo.name || userInfo.data.name} id='username'>
                    <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  {/* <Nav.Link href='/login'>Sign In</Nav.Link>
                  <Nav.Link href='/register'>Sign Up</Nav.Link> */}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
