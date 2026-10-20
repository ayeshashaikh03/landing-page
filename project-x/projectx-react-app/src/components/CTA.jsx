import React from 'react';

const CTA = () => {
  // Handle button click
  const handleGetStarted = (e) => {
    e.preventDefault();
    alert('🎉 Welcome to Project X!\nYour 30-day free trial starts now!');
  };

  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content">
          <h2>
            Ready to Build Better Projects? <br />
            <span>Start Your Free Trial Today!</span>
          </h2>
          <p>
            Join thousands of teams already using Project X to collaborate,
            manage tasks, and deliver outstanding results.
          </p>
          <div className="cta-buttons">
            <a 
              href="#" 
              className="btn btn-primary btn-large"
              onClick={handleGetStarted}
            >
              🚀 Get Started Now
            </a>
            <a 
              href="#features" 
              className="btn btn-outline btn-large"
            >
              Explore Features
            </a>
          </div>
          <div className="cta-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.9⭐</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;