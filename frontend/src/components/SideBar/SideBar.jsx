import React, { useState } from 'react'
import '../../UserCss/SideBar.css'
import { Link } from 'react-router-dom';

const SideBar = () => {

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="">
            <i className="fas fa-home"></i>
            My Home
          </Link>

          <ul className="dropdown-content">
            <li>
              <Link to="/my-residencies">My Residencies</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/profile">
            <i className="fas fa-user"></i>
            My Account
          </Link>

          <ul className="dropdown-content">
            <li>
              <Link to="/profile">Bookings</Link>
            </li>
            <li>
              <Link to="/profile">Favourites</Link>
            </li>
            {/* Add more options as needed */}
          </ul>
        </li>
      </ul>
    </div>
  );
};


export default SideBar
