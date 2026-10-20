import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setIsLoggedIn(true);
      const user = JSON.parse(storedUser);
      setUserName(user.fullName || user.name || 'User');
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`🔍 Searching for: "${searchQuery}"`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
    alert('👋 You have been logged out successfully!');
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo - Left Aligned */}
        <Link to="/" className="logo">
          <span className="logo-icon">⚡</span>
          Project <span>X</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>

        {/* Nav Links - Right Aligned */}
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><a href="#features" className="nav-link">Features</a></li>
          <li><a href="#pricing" className="nav-link">Pricing</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>

          {/* Search Bar */}
          <li>
            <form className="search-box" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </li>

          {/* Login & Register OR User Info - Right Aligned */}
          <li className="nav-buttons">
            {isLoggedIn ? (
              <>
                <span className="user-greeting">
                  <i className="fas fa-user-circle"></i> {userName}
                </span>
                <button onClick={handleLogout} className="btn btn-logout">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-login">
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
                <Link to="/register" className="btn btn-register">
                  <i className="fas fa-user-plus"></i> Register
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;