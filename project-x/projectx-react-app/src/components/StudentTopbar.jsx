import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentTopbar = ({ toggleSidebar, pageTitle = 'Dashboard' }) => {  // ← Added pageTitle prop
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.topbar-profile')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.fullName) {
      const names = user.fullName.split(' ');
      if (names.length >= 2) {
        return names[0][0] + names[1][0];
      }
      return names[0][0];
    }
    return 'S';
  };

  return (
    <header className="student-topbar">
      {/* Left: Menu Toggle + Page Title */}
      <div className="topbar-left">
        <button className="menu-toggle-btn" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Right: User Profile */}
      <div className="topbar-right">
        {/* User Profile Dropdown */}
        <div className="topbar-profile">
          <button className="profile-btn" onClick={toggleDropdown}>
            <div className="profile-avatar-small">
              {/* Show user initials instead of default icon */}
              <span className="avatar-initials">{getUserInitials()}</span>
            </div>
            <span className="profile-name">
              {user?.fullName || 'Student'}
            </span>
            <span className="profile-role-badge">
              {user?.role || 'Student'}
            </span>
            <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="dropdown-avatar">
                  <span className="avatar-initials-large">{getUserInitials()}</span>
                </div>
                <div className="dropdown-user-info">
                  <h4>{user?.fullName || 'Student'}</h4>
                  <p>{user?.role || 'Student'}</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <ul className="dropdown-items">
                <li>
                  <a href="/student/profile">
                    <i className="fas fa-user"></i> My Profile
                  </a>
                </li>
                <li>
                  <a href="/student/settings">
                    <i className="fas fa-cog"></i> Settings
                  </a>
                </li>
                <li>
                  <a href="/student/help">
                    <i className="fas fa-question-circle"></i> Help
                  </a>
                </li>
              </ul>
              <div className="dropdown-divider"></div>
              <ul className="dropdown-items">
                <li>
                  <button onClick={handleLogout} className="dropdown-logout">
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default StudentTopbar;