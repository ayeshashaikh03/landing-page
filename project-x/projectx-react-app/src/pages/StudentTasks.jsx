import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';

const StudentTasks = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="student-main-content">
      <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Tasks" />
        <main className="student-content-area">
          <div className="content-wrapper">
            <h1>✅ Tasks</h1>
            <p>Manage your daily tasks and assignments.</p>
            <div className="placeholder-content">
              <p>Task list will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentTasks;