import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';

const StudentProjectFiles = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="student-main-content">
      <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Project Files" />
        <main className="student-content-area">
          <div className="content-wrapper">
            <h1>📂 Project Files</h1>
            <p>Access and manage your project files.</p>
            <div className="placeholder-content">
              <p>File list will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentProjectFiles;