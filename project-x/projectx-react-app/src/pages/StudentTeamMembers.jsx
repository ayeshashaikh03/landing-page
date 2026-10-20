import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';

const StudentTeamMembers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="student-main-content">
      <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Team Members" />
        <main className="student-content-area">
          <div className="content-wrapper">
            <h1>👥 Team Members</h1>
            <p>View your team members and their roles.</p>
            <div className="placeholder-content">
              <p>Team members list will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentTeamMembers;