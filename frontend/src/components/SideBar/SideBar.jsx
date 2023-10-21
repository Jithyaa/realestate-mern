import React, {useState} from 'react'
import '../../UserCss/SideBar.css'
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const toggleHomeDropdown = () => {
    setShowHomeDropdown(!showHomeDropdown);
  };

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

  return (
    <div className="sidebar">
      {/* <div className="sidebar-header">
        <h3>Your App Name</h3>
      </div> */}
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <i className="fas fa-home"></i>
            My Home
          </Link>
          <div className={`dropdown ${showHomeDropdown ? 'show' : ''}`}>
            <ul className="dropdown-content">
              <li>
                <Link to="/my-residencies">My Residencies</Link>
              </li>
              {/* <li>
                <Link to="/dashboard">Option 2</Link>
              </li> */}
              {/* Add more options as needed */}
            </ul>
          </div>
          <i className="fas fa-caret-down" onClick={toggleHomeDropdown}></i>
        </li>
        <li>
          <Link to="/profile">
            <i className="fas fa-user"></i>
            My Account
          </Link>
          <div className={`dropdown ${showAccountDropdown ? 'show' : ''}`}>
            <ul className="dropdown-content">
              <li>
                <Link to="/profile">Bookings</Link>
              </li>
              <li>
                <Link to="/profile">Favourites</Link>
              </li>
              {/* Add more options as needed */}
            </ul>
          </div>
          <i className="fas fa-caret-down" onClick={toggleAccountDropdown}></i>
        </li>
      </ul>
    </div>
  );
};


export default SideBar
