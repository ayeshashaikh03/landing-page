import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';

const StudentProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="student-main-content">
      <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Profile" />
        <main className="student-content-area">
          <div className="content-wrapper">
            <h1>👤 Profile</h1>
            <p>View and edit your profile information.</p>
            <div className="placeholder-content">
              <p>Profile details will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;