import React, { useState, useEffect } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';
import ProjectMetricCard from '../components/ProjectMetricCard';
import ProjectFilters from '../components/ProjectFilters';
import ProjectCard from '../components/ProjectCard';
import EmptyState from '../components/EmptyState';
import CreateProjectModal from '../components/CreateProjectModal';
import { getMyProjects } from '../services/api';

const StudentMyProject = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle New Project button click
  const handleNewProject = () => {
    setIsModalOpen(true);
  };

  // Handle project creation
  const handleCreateProject = (newProject) => {
    // Add new project to the list
    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
  };

  // Filter handlers
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  // ✅ Fetch real projects from API
useEffect(() => {
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get user ID from localStorage
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      
      if (!user || !user.id) {
        console.log('❌ No user found in localStorage');
        setProjects([]);
        setLoading(false);
        return;
      }

      console.log('📁 Fetching projects for user:', user.id);
      
      // ✅ Call the Get My Projects API
      const response = await getMyProjects(user.id);
      console.log('📁 Projects fetched:', response.data);
      
      // Format the data for display
      const formattedProjects = response.data.projects.map(project => ({
        id: project._id,
        name: project.projectName,
        category: project.projectCategory,
        status: project.status,
        progress: project.progress || 0,
        teamSize: project.teamMembers?.length || 1,
        deadline: project.deadline || 'No deadline',
        projectCode: project.projectCode
      }));
      
      setProjects(formattedProjects);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching projects:', err);
      
      // If no projects exist yet, show empty state
      if (err.response?.status === 404) {
        setProjects([]);
        setError(null);
      } else {
        setError('Failed to load projects. Please try again.');
        setProjects([]);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

  // Filter projects based on search, category, and status
  const filteredProjects = projects.filter(project => {
    const matchSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter ? project.category === categoryFilter : true;
    const matchStatus = statusFilter ? project.status === statusFilter : true;
    return matchSearch && matchCategory && matchStatus;
  });

  // Metric data with real counts
  const metrics = [
    {
      id: 1,
      icon: 'fas fa-rocket',
      label: 'Active Projects',
      value: projects.filter(p => p.status === 'Active' || p.status === 'In Progress').length,
      color: '#6c63ff',
      bgColor: 'rgba(108, 99, 255, 0.1)'
    },
    {
      id: 2,
      icon: 'fas fa-clock',
      label: 'Pending Tasks',
      value: 8,
      color: '#ffa502',
      bgColor: 'rgba(255, 165, 2, 0.1)'
    },
    {
      id: 3,
      icon: 'fas fa-users',
      label: 'Team Members',
      value: 6,
      color: '#2ed573',
      bgColor: 'rgba(46, 213, 115, 0.1)'
    },
    {
      id: 4,
      icon: 'fas fa-chalkboard-teacher',
      label: 'Mentor Reviews',
      value: 4,
      color: '#ff6b6b',
      bgColor: 'rgba(255, 107, 107, 0.1)'
    },
    {
      id: 5,
      icon: 'fas fa-envelope',
      label: 'New Messages',
      value: 15,
      color: '#4a90d9',
      bgColor: 'rgba(74, 144, 217, 0.1)'
    }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="student-dashboard-layout">
        <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="student-main-content">
          <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="My Projects" />
          <main className="student-content-area">
            <div className="content-wrapper">
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading your projects...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="student-dashboard-layout">
        <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="student-main-content">
          <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="My Projects" />
          <main className="student-content-area">
            <div className="content-wrapper">
              <div className="error-state">
                <i className="fas fa-exclamation-circle"></i>
                <h3>Oops! Something went wrong</h3>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>
                  <i className="fas fa-sync"></i> Try Again
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="student-main-content">
        <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="My Projects" />
        <main className="student-content-area">
          <div className="content-wrapper">
            
            {/* Page Header Section */}
            <div className="page-header">
              <div className="page-header-left">
                <h1 className="page-title">
                  <i className="fas fa-project-diagram"></i> My Projects
                </h1>
                <p className="page-description">
                  Manage and track all your projects. Create new projects and collaborate with your team.
                </p>
              </div>
              <div className="page-header-right">
                <button className="btn btn-primary btn-new-project" onClick={handleNewProject}>
                  <i className="fas fa-plus"></i> New Project
                </button>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="metrics-grid">
              {metrics.map((metric) => (
                <ProjectMetricCard
                  key={metric.id}
                  icon={metric.icon}
                  label={metric.label}
                  value={metric.value}
                  color={metric.color}
                  bgColor={metric.bgColor}
                />
              ))}
            </div>

            {/* Search & Filters */}
            <ProjectFilters
              onSearch={handleSearch}
              onCategoryFilter={handleCategoryFilter}
              onStatusFilter={handleStatusFilter}
            />

            {/* Projects Grid or Empty State */}
            {filteredProjects.length === 0 ? (
              <EmptyState onNewProject={handleNewProject} />
            ) : (
              <div className="projects-grid">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default StudentMyProject;