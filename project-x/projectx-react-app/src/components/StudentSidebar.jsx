import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const StudentSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  // Navigation items for student dashboard
  const navItems = [
    { 
      path: '/student/dashboard', 
      icon: 'fas fa-chart-pie', 
      label: 'Dashboard' 
    },
    { 
      path: '/student/my-project', 
      icon: 'fas fa-project-diagram', 
      label: 'My Project' 
    },
    { 
      path: '/student/team-members', 
      icon: 'fas fa-users', 
      label: 'Team Members' 
    },
    { 
      path: '/student/mentor', 
      icon: 'fas fa-chalkboard-teacher', 
      label: 'Mentor' 
    },
    { 
      path: '/student/tasks', 
      icon: 'fas fa-tasks', 
      label: 'Tasks' 
    },
    { 
      path: '/student/task-submissions', 
      icon: 'fas fa-upload', 
      label: 'Task Submissions' 
    },
    { 
      path: '/student/communication', 
      icon: 'fas fa-comments', 
      label: 'Communication' 
    },
    { 
      path: '/student/project-files', 
      icon: 'fas fa-folder-open', 
      label: 'Project Files' 
    },
    { 
      path: '/student/performance', 
      icon: 'fas fa-chart-line', 
      label: 'Performance' 
    },
    { 
      path: '/student/notifications', 
      icon: 'fas fa-bell', 
      label: 'Notifications' 
    },
    { 
      path: '/student/profile', 
      icon: 'fas fa-user', 
      label: 'Profile' 
    },
  ];

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      {/* Sidebar Overlay (for mobile) */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`student-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Sidebar Header - Fixed at top */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Project <span>X</span></span>
          </div>
          <button className="sidebar-close" onClick={toggleSidebar}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Sidebar User Info - Fixed below header */}
        <div className="sidebar-user">
          <div className="user-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="user-info">
            <h4>Ayesha</h4>
            <p>Student</p>
          </div>
        </div>

        {/* Sidebar Navigation - Scrollable */}
        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  onClick={() => {
                    // Close sidebar on mobile when link is clicked
                    if (window.innerWidth <= 768) {
                      toggleSidebar();
                    }
                  }}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer with Logout - Fixed at bottom */}
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="nav-link logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;