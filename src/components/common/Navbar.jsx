import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = (e) => {
      if (isMenuOpen && !e.target.closest(".navbar")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [isMenuOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            Caprae
          </Link>

          <div className="nav-content">
            <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
              <NavLink
                to="/dashboard"
                className="nav-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/deal/123"
                className="nav-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Deal Room
              </NavLink>
              <NavLink
                to="/onboarding"
                className="nav-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Onboarding
              </NavLink>
            </div>

            <div className="navbar-right">
              <button onClick={toggleTheme} className="theme-switcher">
                {theme === "light" ? "🌙" : "☀️"}
              </button>
              <div className="profile-icon">KH</div>
              <button
                className={`mobile-menu-btn ${isMenuOpen ? "active" : ""}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <span className="hamburger"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
