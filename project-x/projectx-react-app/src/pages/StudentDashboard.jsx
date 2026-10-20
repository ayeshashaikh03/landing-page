import React, { useState, useEffect } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sample project data
  const projectData = {
    name: 'Project X - Student Portal',
    status: 'Active',
    description: 'Building a complete student dashboard with authentication and task management.',
    deadline: '2026-08-15',
    progress: 65
  };

  // Sample team members data
  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Project Lead', avatar: 'JD', status: 'online' },
    { id: 2, name: 'Jane Smith', role: 'Frontend Developer', avatar: 'JS', status: 'online' },
    { id: 3, name: 'Mike Johnson', role: 'Backend Developer', avatar: 'MJ', status: 'away' },
    { id: 4, name: 'Emily Davis', role: 'UI/UX Designer', avatar: 'ED', status: 'offline' },
  ];

  // Sample tasks data
  const tasks = {
    total: 24,
    completed: 12,
    inProgress: 8,
    pending: 4
  };

  // Sample pending tasks list
  const pendingTasks = [
    { id: 1, title: 'Design login page UI', priority: 'high', dueDate: '2026-07-10' },
    { id: 2, title: 'Fix navigation bug', priority: 'medium', dueDate: '2026-07-12' },
    { id: 3, title: 'Write API documentation', priority: 'low', dueDate: '2026-07-15' },
    { id: 4, title: 'Update user profile page', priority: 'high', dueDate: '2026-07-08' },
  ];

  // ✅ Sample notifications data
  const notificationData = [
    {
      id: 1,
      type: 'task',
      icon: 'fas fa-check-circle',
      iconColor: '#2ed573',
      message: 'Task "Design login page UI" has been completed',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'team',
      icon: 'fas fa-user-plus',
      iconColor: '#6c63ff',
      message: 'Jane Smith joined your team',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'deadline',
      icon: 'fas fa-exclamation-triangle',
      iconColor: '#ffa502',
      message: 'Project deadline is approaching in 3 days',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'mentor',
      icon: 'fas fa-chalkboard-teacher',
      iconColor: '#ff6b6b',
      message: 'Your mentor has left feedback on your project',
      time: '2 days ago',
      read: true
    },
    {
      id: 5,
      type: 'task',
      icon: 'fas fa-clock',
      iconColor: '#ff6b6b',
      message: 'Task "Update user profile page" is overdue',
      time: '3 days ago',
      read: true
    }
  ];

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Set notifications on load
  useEffect(() => {
    setNotifications(notificationData);
  }, []);

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="student-main-content">
        <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Dashboard" />
        <main className="student-content-area">
          <div className="content-wrapper">
            
            {/* Welcome Card */}
            <div className="welcome-card">
              <div className="welcome-content">
                <div className="welcome-text">
                  <h1>
                    Welcome back, <span className="student-name">{user?.fullName || 'Student'}! 👋</span>
                  </h1>
                  <p className="welcome-subtitle">
                    Here's what's happening with your projects today.
                  </p>
                </div>
                <div className="welcome-avatar">
                  <div className="welcome-avatar-circle">
                    {user?.fullName ? (
                      <span className="avatar-initials-large">
                        {user.fullName.split(' ').map(n => n[0]).join('')}
                      </span>
                    ) : (
                      <i className="fas fa-user-circle"></i>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="student-info-grid">
                <div className="info-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <span className="info-label">Email</span>
                    <span className="info-value">{user?.email || 'student@example.com'}</span>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-user-tag"></i>
                  <div>
                    <span className="info-label">Role</span>
                    <span className="info-value role-badge-small">{user?.role || 'Student'}</span>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-calendar-check"></i>
                  <div>
                    <span className="info-label">Member Since</span>
                    <span className="info-value">{new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* My Project Card */}
            <div className="my-project-card">
              <div className="project-header">
                <div className="project-title">
                  <i className="fas fa-project-diagram"></i>
                  <h2>My Project</h2>
                </div>
                <span className={`project-status status-${projectData.status.toLowerCase()}`}>
                  {projectData.status}
                </span>
              </div>
              <div className="project-body">
                <h3>{projectData.name}</h3>
                <p className="project-description">{projectData.description}</p>
                <div className="project-meta">
                  <div className="meta-item">
                    <i className="fas fa-calendar-alt"></i>
                    <span>Deadline: {new Date(projectData.deadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-chart-line"></i>
                    <span>Progress: {projectData.progress}%</span>
                  </div>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${projectData.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="dashboard-stats">
              {/* Team Members Card */}
              <div className="stat-card team-card">
                <div className="stat-card-header">
                  <i className="fas fa-users"></i>
                  <span className="stat-count">{teamMembers.length}</span>
                </div>
                <h4>Team Members</h4>
                <div className="team-avatars">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="team-avatar-wrapper">
                      <div className={`team-avatar status-${member.status}`}>
                        <span>{member.avatar}</span>
                      </div>
                      <span className="team-name">{member.name}</span>
                    </div>
                  ))}
                </div>
                <button className="view-all-btn">
                  View All Members →
                </button>
              </div>

              {/* Total Tasks Card */}
              <div className="stat-card tasks-card">
                <div className="stat-card-header">
                  <i className="fas fa-tasks"></i>
                  <span className="stat-count">{tasks.total}</span>
                </div>
                <h4>Total Tasks</h4>
                <div className="tasks-breakdown">
                  <div className="task-status-item">
                    <span className="task-status-dot completed"></span>
                    <span>Completed</span>
                    <span className="task-status-count">{tasks.completed}</span>
                  </div>
                  <div className="task-status-item">
                    <span className="task-status-dot in-progress"></span>
                    <span>In Progress</span>
                    <span className="task-status-count">{tasks.inProgress}</span>
                  </div>
                  <div className="task-status-item">
                    <span className="task-status-dot pending"></span>
                    <span>Pending</span>
                    <span className="task-status-count">{tasks.pending}</span>
                  </div>
                </div>
                <button className="view-all-btn">
                  View All Tasks →
                </button>
              </div>

              {/* Pending Tasks Card */}
              <div className="stat-card pending-card">
                <div className="stat-card-header">
                  <i className="fas fa-clock"></i>
                  <span className="stat-count pending-count">{tasks.pending}</span>
                </div>
                <h4>Pending Tasks</h4>
                <div className="pending-tasks-list">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="pending-task-item">
                      <div className={`priority-dot priority-${task.priority}`}></div>
                      <span className="pending-task-title">{task.title}</span>
                      <span className="pending-task-due">
                        <i className="fas fa-calendar-alt"></i>
                        {new Date(task.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="view-all-btn">
                  View All Pending Tasks →
                </button>
              </div>
            </div>

            {/* Project Progress & Notifications - Updated */}
            <div className="dashboard-bottom">
              {/* Progress Section */}
              <div className="progress-section">
                <div className="section-header">
                  <h3>📊 Project Progress</h3>
                  <span className="progress-percentage">{projectData.progress}%</span>
                </div>
                
                <div className="progress-track">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${projectData.progress}%` }}
                  >
                    <span className="progress-tooltip">{projectData.progress}%</span>
                  </div>
                </div>

                <div className="progress-stats">
                  <div className="progress-stat">
                    <span className="stat-dot completed"></span>
                    <div>
                      <span className="stat-number">{tasks.completed}</span>
                      <span className="stat-label">Completed</span>
                    </div>
                  </div>
                  <div className="progress-stat">
                    <span className="stat-dot in-progress"></span>
                    <div>
                      <span className="stat-number">{tasks.inProgress}</span>
                      <span className="stat-label">In Progress</span>
                    </div>
                  </div>
                  <div className="progress-stat">
                    <span className="stat-dot pending"></span>
                    <div>
                      <span className="stat-number">{tasks.pending}</span>
                      <span className="stat-label">Pending</span>
                    </div>
                  </div>
                </div>

                <div className="milestones">
                  <div className="milestone completed">
                    <div className="milestone-icon">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="milestone-info">
                      <h4>Project Setup</h4>
                      <p>Completed</p>
                    </div>
                    <span className="milestone-date">Jul 1, 2026</span>
                  </div>
                  <div className="milestone in-progress">
                    <div className="milestone-icon">
                      <i className="fas fa-spinner fa-spin"></i>
                    </div>
                    <div className="milestone-info">
                      <h4>Frontend Development</h4>
                      <p>In Progress</p>
                    </div>
                    <span className="milestone-date">Jul 15, 2026</span>
                  </div>
                  <div className="milestone pending">
                    <div className="milestone-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="milestone-info">
                      <h4>Backend Integration</h4>
                      <p>Pending</p>
                    </div>
                    <span className="milestone-date">Jul 30, 2026</span>
                  </div>
                </div>
              </div>

              {/* ✅ Recent Notifications Section */}
              <div className="notifications-section">
                <div className="notifications-header">
                  <h3>🔔 Recent Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="unread-badge">{unreadCount} new</span>
                  )}
                </div>
                
                {unreadCount > 0 && (
                  <button className="mark-all-read" onClick={markAllAsRead}>
                    Mark all as read
                  </button>
                )}

                <div className="notifications-list">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${!notification.read ? 'unread' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="notification-icon" style={{ color: notification.iconColor }}>
                          <i className={notification.icon}></i>
                        </div>
                        <div className="notification-content">
                          <p className="notification-message">{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                        {!notification.read && (
                          <span className="unread-dot"></span>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="no-notifications">No notifications</p>
                  )}
                </div>

                <button className="view-all-btn">
                  View All Notifications →
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;