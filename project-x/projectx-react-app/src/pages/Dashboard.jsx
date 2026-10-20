import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <i className="fas fa-spinner fa-spin"></i> Loading...
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      
      <div className="dashboard-page">
        <div className="container">
          
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <h1>
              <i className="fas fa-chart-pie"></i> Project X Dashboard
            </h1>
            <p className="dashboard-subtitle">
              Welcome back! Here's an overview of your account.
            </p>
          </div>
  
          {/* User Profile Card */}
          <div className="dashboard-profile">
            <div className="profile-card">
              <div className="file-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="profile-info">
                <h2>{user.fullName}</h2>
                <p className="profile-email">
                  <i className="fas fa-envelope"></i> {user.email}
                </p>
                <p className="profile-role">
                  <i className="fas fa-user-tag"></i> Role: <span className="role-badge">{user.role}</span>
                </p>
                <p className="profile-member">
                  <i className="fas fa-calendar-check"></i> Member since: {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="profile-actions">
                <button onClick={handleLogout} className="btn btn-logout">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          </div>
  
          {/* Dashboard Stats */}
          <div className="dashboard-stats">
            <div className="stat-card">
              <i className="fas fa-project-diagram"></i>
              <div className="stat-info">
                <h3>0</h3>
                <p>Active Projects</p>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-users"></i>
              <div className="stat-info">
                <h3>0</h3>
                <p>Team Members</p>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-tasks"></i>
              <div className="stat-info">
                <h3>0</h3>
                <p>Tasks Completed</p>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-calendar-check"></i>
              <div className="stat-info">
                <h3>0</h3>
                <p>Upcoming Deadlines</p>
              </div>
            </div>
          </div>
  
          {/* Quick Actions */}
          <div className="dashboard-actions">
            <h3>🚀 Quick Actions</h3>
            <div className="actions-grid">
              <button className="action-btn btn btn-primary">
                <i className="fas fa-plus-circle"></i> Create New Project
              </button>
              <button className="action-btn btn btn-outline">
                <i className="fas fa-users"></i> Invite Team Members
              </button>
              <button className="action-btn btn btn-outline">
                <i className="fas fa-file-alt"></i> View All Projects
              </button>
              <button className="action-btn btn btn-outline">
                <i className="fas fa-cog"></i> Account Settings
              </button>
            </div>
          </div>
  
          {/* Extra space at bottom */}
          <div style={{ height: '40px' }}></div>
  
        </div>
      </div>
  
      <Footer />
    </div>
  );
};

export default Dashboard;