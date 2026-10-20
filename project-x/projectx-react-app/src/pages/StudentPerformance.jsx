import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';

const StudentPerformance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="student-main-content">
      <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Performance" />
        <main className="student-content-area">
          <div className="content-wrapper">
            <h1>📈 Performance</h1>
            <p>Track your progress and performance metrics.</p>
            <div className="placeholder-content">
              <p>Performance charts will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentPerformance;