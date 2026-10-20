import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';

const StudentTaskSubmissions = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="student-main-content">
      <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Task Submissions" />
        <main className="student-content-area">
          <div className="content-wrapper">
            <h1>📤 Task Submissions</h1>
            <p>View and manage your task submissions.</p>
            <div className="placeholder-content">
              <p>Submitted tasks will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentTaskSubmissions;