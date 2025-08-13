import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useUser } from "../../contexts/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  const getInitials = () => {
    if (!user) return "U";
    const name = user.name || "";
    const names = name.trim().split(/\s+/);
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

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

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            Caprae
          </Link>

          <div className="nav-content">
            <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
              {user ? (
                <>
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
                </>
              ) : (
                <NavLink
                  to="/onboarding"
                  className="nav-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </NavLink>
              )}
            </div>

            <div className="navbar-right">
              <button onClick={toggleTheme} className="theme-switcher">
                {theme === "light" ? "🌙" : "☀️"}
              </button>
              <div className="profile-wrapper" ref={profileMenuRef}>
                <div
                  className="profile-icon"
                  onClick={() => user && setShowProfileMenu(!showProfileMenu)}
                  style={{
                    backgroundColor: user ? "#007bff" : "#6c757d",
                    cursor: user ? "pointer" : "default",
                  }}
                >
                  {getInitials()}
                </div>
                {showProfileMenu && user && (
                  <div className="profile-dropdown">
                    <div className="profile-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-type">{user.type}</span>
                    </div>
                    <button onClick={logout} className="logout-button">
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
