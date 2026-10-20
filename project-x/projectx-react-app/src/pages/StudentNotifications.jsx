import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';

const StudentNotifications = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="student-main-content">
      <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Notifications" />
        <main className="student-content-area">
          <div className="content-wrapper">
            <h1>🔔 Notifications</h1>
            <p>View all your notifications.</p>
            <div className="placeholder-content">
              <p>Notifications will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentNotifications;