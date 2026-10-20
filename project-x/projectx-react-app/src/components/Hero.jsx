import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🚀</span>
            <span className="badge-text">Now in Beta</span>
          </div>
          
          <h1 className="hero-title">
            Build Better Projects with{' '}
            <span className="hero-highlight">Project X</span>
          </h1>
          
          <p className="hero-description">
            The all-in-one platform for teams to collaborate, manage tasks,
            and bring ideas to life. Start your 30-day free trial today!
          </p>
          
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-hero">
              <i className="fas fa-rocket"></i> Get Started Free
            </Link>
            <a href="#features" className="btn btn-outline btn-hero">
              <i className="fas fa-play-circle"></i> Learn More
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="stat-number">4.9⭐</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="hero-illustration">
            <div className="illustration-box box-1">
              <i className="fas fa-project-diagram"></i>
              <span>Projects</span>
            </div>
            <div className="illustration-box box-2">
              <i className="fas fa-users"></i>
              <span>Teams</span>
            </div>
            <div className="illustration-box box-3">
              <i className="fas fa-tasks"></i>
              <span>Tasks</span>
            </div>
            <div className="illustration-box box-4">
              <i className="fas fa-chart-line"></i>
              <span>Analytics</span>
            </div>
            <div className="illustration-circle circle-1"></div>
            <div className="illustration-circle circle-2"></div>
            <div className="illustration-circle circle-3"></div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0,40 C360,120 720,0 1080,60 C1260,90 1380,70 1440,80 L1440,120 L0,120 Z" 
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;