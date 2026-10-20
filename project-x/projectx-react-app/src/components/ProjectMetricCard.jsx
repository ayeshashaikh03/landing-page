import React from 'react';

const ProjectMetricCard = ({ icon, label, value, color, bgColor }) => {
  return (
    <div className="metric-card" style={{ borderLeftColor: color }}>
      <div className="metric-icon" style={{ backgroundColor: bgColor, color: color }}>
        <i className={icon}></i>
      </div>
      <div className="metric-content">
        <span className="metric-value">{value}</span>
        <span className="metric-label">{label}</span>
      </div>
    </div>
  );
};

export default ProjectMetricCard;