import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Caprae
        </Link>
        <div className="nav-menu">
          <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
          <NavLink to="/deal/123" className="nav-item">Deal Room</NavLink>
          <NavLink to="/onboarding" className="nav-item">Onboarding</NavLink>
          <span className="nav-item profile-icon">KH</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
