import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';

const StudentCommunication = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="student-main-content">
      <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Communication" />
        <main className="student-content-area">
          <div className="content-wrapper">
            <h1>💬 Communication</h1>
            <p>Chat and communicate with your team.</p>
            <div className="placeholder-content">
              <p>Messages will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentCommunication;