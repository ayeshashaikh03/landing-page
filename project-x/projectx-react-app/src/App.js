import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import StudentMyProject from './pages/StudentMyProject';
import StudentTeamMembers from './pages/StudentTeamMembers';
import StudentMentor from './pages/StudentMentor';
import StudentTasks from './pages/StudentTasks';
import StudentTaskSubmissions from './pages/StudentTaskSubmissions';
import StudentCommunication from './pages/StudentCommunication';
import StudentProjectFiles from './pages/StudentProjectFiles';
import StudentPerformance from './pages/StudentPerformance';
import StudentNotifications from './pages/StudentNotifications';
import StudentProfile from './pages/StudentProfile';
import StudentProjectWorkspace from './pages/StudentProjectWorkspace';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Student Dashboard Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/my-project" element={<StudentMyProject />} />
          <Route path="/student/team-members" element={<StudentTeamMembers />} />
          <Route path="/student/mentor" element={<StudentMentor />} />
          <Route path="/student/tasks" element={<StudentTasks />} />
          <Route path="/student/task-submissions" element={<StudentTaskSubmissions />} />
          <Route path="/student/communication" element={<StudentCommunication />} />
          <Route path="/student/project-files" element={<StudentProjectFiles />} />
          <Route path="/student/performance" element={<StudentPerformance />} />
          <Route path="/student/notifications" element={<StudentNotifications />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/my-project/:projectId" element={<StudentProjectWorkspace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;