import React, { useState } from 'react';
import { FaRegCalendarAlt, FaChevronDown, FaRegMoon, FaUserCircle, FaSignOutAlt, FaExpand } from 'react-icons/fa';
import '../styles/TopBar.css';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ isSidebarOpen }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className={`topbar ${isSidebarOpen ? 'shifted' : ''}`}>
 
      <h3 className="topbar-title">Dashboard</h3>
      <div className="topbar-right">
        <div className="calendar-container">
          <FaRegCalendarAlt className="icon" />
          <div className="date-column">
            <span className="date-text">Last 7 Days: Jan 14 - Jan 20, 2024</span>
            <span className="date-text compared-text">Compared: Jan 07 - Jan 13, 2024</span>
          </div>
          <FaChevronDown className="down-arrow" />
        </div>
        <FaExpand className="icon expand-icon" />
        <FaRegMoon className="icon" />
        <div className="profile-section" onClick={toggleDropdown}>
          <FaUserCircle className="icon profile-icon" />
          <FaChevronDown className="profile-down-arrow" />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <div className="avatar">N</div>
            <div className="user-info">
              <p className="user-name">Naveen</p>
              <p className="user-status">Online</p>
            </div>
          </div>
          <div className="dropdown-logout" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" />
            <span className="logout-text">Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
