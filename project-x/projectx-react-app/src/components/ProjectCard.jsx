import React from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ Add this import

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();  // ✅ Add this

  // ✅ Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#6c63ff';
      case 'In Progress':
        return '#ffa502';
      case 'Completed':
        return '#2ed573';
      case 'On Hold':
        return '#ff6b6b';
      default:
        return '#6c63ff';
    }
  };

  // ✅ Get status background color
  const getStatusBg = (status) => {
    switch (status) {
      case 'Active':
        return 'rgba(108, 99, 255, 0.1)';
      case 'In Progress':
        return 'rgba(255, 165, 2, 0.1)';
      case 'Completed':
        return 'rgba(46, 213, 115, 0.1)';
      case 'On Hold':
        return 'rgba(255, 107, 107, 0.1)';
      default:
        return 'rgba(108, 99, 255, 0.1)';
    }
  };

  // ✅ Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web Application':
        return '🌐';
      case 'Mobile Application':
        return '📱';
      case 'AI/ML Project':
        return '🤖';
      case 'IoT Project':
        return '📡';
      case 'E-Commerce':
        return '🛒';
      case 'Management System':
        return '📊';
      default:
        return '📁';
    }
  };

  // ✅ Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // ✅ Handle Open Workspace click
  const handleOpenWorkspace = () => {
    navigate(`/student/my-project/${project.id}`);
  };

  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-card-icon">
          <span className="category-emoji">{getCategoryIcon(project.category)}</span>
        </div>
        <div className="project-card-status">
          <span 
            className="status-badge"
            style={{ 
              backgroundColor: getStatusBg(project.status),
              color: getStatusColor(project.status)
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      <div className="project-card-body">
        <h3 className="project-card-title">{project.name}</h3>
        <p className="project-card-category">
          <span className="category-emoji-small">{getCategoryIcon(project.category)}</span>
          {project.category}
        </p>

        <div className="project-card-code">
          <span className="code-label">Project Code:</span>
          <span className="code-value">{project.projectCode || 'N/A'}</span>
        </div>

        <div className="project-card-dates">
          <div className="date-item">
            <span className="date-label">Created:</span>
            <span className="date-value">{formatDate(project.createdAt)}</span>
          </div>
          <div className="date-item">
            <span className="date-label">Updated:</span>
            <span className="date-value">{formatDate(project.updatedAt)}</span>
          </div>
        </div>

        <div className="project-card-progress">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span className="progress-percentage">{project.progress || 0}%</span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${project.progress || 0}%` }}
            ></div>
          </div>
        </div>

        <div className="project-card-meta">
          <div className="meta-item">
            <i className="fas fa-users"></i>
            <span>{project.teamSize || 1} Members</span>
          </div>
          <div className="meta-item">
            <i className="fas fa-calendar-alt"></i>
            <span>{project.deadline || 'No deadline'}</span>
          </div>
        </div>
      </div>

      <div className="project-card-footer">
        {/* ✅ Open Workspace Button with onClick */}
        <button className="btn-view-project" onClick={handleOpenWorkspace}>
          <i className="fas fa-arrow-right"></i> Open Workspace
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;