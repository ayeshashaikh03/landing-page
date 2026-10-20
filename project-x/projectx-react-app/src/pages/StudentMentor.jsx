import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';

const StudentMentor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="student-main-content">
      <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Mentor" />
        <main className="student-content-area">
          <div className="content-wrapper">
            <h1>👨‍🏫 Mentor</h1>
            <p>Connect with your assigned mentor.</p>
            <div className="placeholder-content">
              <p>Mentor details will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentMentor;