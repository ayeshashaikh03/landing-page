import React from 'react';

const Features = () => {
  // Array of feature data
  const featuresData = [
    {
      id: 1,
      icon: 'fa-users',
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time messaging, file sharing, and collaborative editing.'
    },
    {
      id: 2,
      icon: 'fa-tasks',
      title: 'Task Management',
      description: 'Track progress with Kanban boards, deadlines, and priority levels for every task.'
    },
    {
      id: 3,
      icon: 'fa-chalkboard-teacher',
      title: 'Mentor Monitoring',
      description: 'Get expert guidance with built-in mentor tools for reviews, feedback, and coaching.'
    },
    {
      id: 4,
      icon: 'fa-upload',
      title: 'File Upload',
      description: 'Share documents, images, and assets instantly with secure cloud storage integration.'
    },
    {
      id: 5,
      icon: 'fa-chart-line',
      title: 'Analytics Dashboard',
      description: 'Gain insights with real-time reports, productivity metrics, and performance tracking.'
    },
    {
      id: 6,
      icon: 'fa-mobile-alt',
      title: 'Mobile Ready',
      description: 'Access your projects from anywhere with our fully responsive mobile-optimized platform.'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title">
          Why Choose <span>Project X</span>?
        </h2>
        <p className="section-subtitle">
          Everything you need to manage projects, collaborate with your team,
          and deliver outstanding results.
        </p>

        <div className="features-grid">
          {/* Loop through featuresData array and render each card */}
          {featuresData.map((feature) => (
            <div className="feature-card" key={feature.id}>
              <i className={`fas ${feature.icon}`}></i>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;