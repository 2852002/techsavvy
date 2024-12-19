import React, { useState } from 'react';
import '../styles/Sidebar.css';
import logo1 from '../assets/logopicture.png';  
import logo2 from '../assets/logo.png';     
import menu from '../assets/Top Menu.png';    
import dashboardIcon from '../assets/dashboard.png'; 
import settingsIcon from '../assets/settings.png';  

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);  
  const [logo, setLogo] = useState(logo1);    
  const [isMenuVisible, setIsMenuVisible] = useState(true);  
  const handleMouseEnter = () => {
    setIsOpen(true);
    setLogo(logo2); 
    setIsMenuVisible(false);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setLogo(logo1); 
    setIsMenuVisible(true); 
  };

  return (
    <div
      className={`sidebar ${isOpen ? 'open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      {isMenuVisible && (
        <div className="menu">
          <img src={menu} alt="Menu" />
        </div>
      )}

      {/* Divider */}
      <div className="divider"></div>

      {/* Menu Items */}
      <div className="menu">
        <div className="menu-item">
          <img src={dashboardIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </div>
      </div>

      {/* Settings - Positioned at the bottom */}
      <div className="settings">
        <div className="menu-item">
          <img src={settingsIcon} alt="Settings" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
