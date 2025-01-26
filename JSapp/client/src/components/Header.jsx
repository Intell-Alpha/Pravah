import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-scroll';
import './Header.css';

const Header = () => {
  const location = useLocation();

  // Check if the current route is a dashboard page
  const isDashboardPage = location.pathname.includes('Dashboard');

  return (
    <header className="header-container">
      <div className="logo-container">
        <img className="logo" src="/logo_pravah.png" alt="Pravah Logo" />
      </div>
      <nav className="nav">
        {/* Conditionally render the nav items based on the page */}
        {!isDashboardPage && (
          <>
            <div className="nav-item">
              <a href="/">Home</a>
            </div>
            <div className="nav-item">
              <Link to="home" smooth={true} duration={500}>
                About Us
              </Link>
            </div>
            <div className="nav-item">
              <Link to="about" smooth={true} duration={500}>
                Faq's
              </Link>
            </div>
            <div className="nav-item">
              <Link to="team" smooth={true} duration={500}>
                Our Team
              </Link>
            </div>
            <div className="nav-signin">
              <button className="sign-in-button" onClick={() => window.location.href = '/login'}>
                Sign In
              </button>
      </div>
          </>
        )}
        {/* Only show these links on Dashboard pages */}
        {isDashboardPage && (
          <>
            <div className="nav-item">
              <Link to="dashboard" smooth={true} duration={500}>
                Dashboard
              </Link>
            </div>
            <div className="nav-item">
              <Link to="applications" smooth={true} duration={500}>
                Applications
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
