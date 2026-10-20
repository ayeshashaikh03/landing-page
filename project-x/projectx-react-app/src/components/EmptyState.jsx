import React from 'react';

const EmptyState = ({ onNewProject }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <i className="fas fa-folder-open"></i>
      </div>
      <h3>No Projects Yet</h3>
      <p>You haven't created any projects yet. Start your first project now!</p>
      <button className="btn btn-primary" onClick={onNewProject}>
        <i className="fas fa-plus"></i> Create Your First Project
      </button>
    </div>
  );
};

export default EmptyState;
