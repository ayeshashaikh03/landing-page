import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';
import TeamMembersTab from '../components/TeamMembersTab';
import { getProjectById, updateProject, deleteProject } from '../services/api';
import {
  FiArrowLeft,
  FiInfo,
  FiUsers,
  FiUserCheck,
  FiCheckSquare,
  FiMessageSquare,
  FiFolder,
  FiActivity,
  FiDollarSign,
  FiEdit3,
  FiSave,
  FiX,
  FiTrash2,
  FiLogOut
} from 'react-icons/fi';

const StudentProjectWorkspace = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  
  // ✅ Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    projectName: '',
    projectCategory: '',
    description: '',
    mission: '',
    goals: [],
    problemStatement: '',
    targetUsers: '',
    expectedOutcome: '',
    technologyStack: []
  });
  const [goalInput, setGoalInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ✅ Tab Configuration with React Icons
  const tabs = [
    {
      id: 'basic',
      label: 'Basic Information',
      icon: <FiInfo size={24} />,
      color: '#6c63ff',
      bgColor: 'rgba(108, 99, 255, 0.1)'
    },
    {
      id: 'team',
      label: 'Team Members',
      icon: <FiUsers size={24} />,
      color: '#2ed573',
      bgColor: 'rgba(46, 213, 115, 0.1)'
    },
    {
      id: 'mentor',
      label: 'Mentor',
      icon: <FiUserCheck size={24} />,
      color: '#ffa502',
      bgColor: 'rgba(255, 165, 2, 0.1)'
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: <FiCheckSquare size={24} />,
      color: '#ff6b6b',
      bgColor: 'rgba(255, 107, 107, 0.1)'
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: <FiMessageSquare size={24} />,
      color: '#4a90d9',
      bgColor: 'rgba(74, 144, 217, 0.1)'
    },
    {
      id: 'files',
      label: 'Files',
      icon: <FiFolder size={24} />,
      color: '#f9ca24',
      bgColor: 'rgba(249, 202, 36, 0.1)'
    },
    {
      id: 'finances',
      label: 'Finances',
      icon: <FiDollarSign size={24} />,
      color: '#2ed573',
      bgColor: 'rgba(46, 213, 115, 0.1)'
    },
    {
      id: 'status',
      label: 'Status',
      icon: <FiActivity size={24} />,
      color: '#6c63ff',
      bgColor: 'rgba(108, 99, 255, 0.1)'
    }
  ];

  // ============================================
  // ✅ Helper Functions
  // ============================================

  const getLoggedInUser = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return null;
    }
    return JSON.parse(storedUser);
  };

  const getLoggedInUserId = () => {
    const user = getLoggedInUser();
    if (!user) {
      return null;
    }
    return user._id || user.id;
  };

  const getProjectCreatorId = () => {
    if (!project || !project.createdBy) {
      return "";
    }
    if (typeof project.createdBy === "object") {
      return project.createdBy._id;
    }
    return project.createdBy;
  };

  const isProjectCreator = () => {
    const loggedInUserId = getLoggedInUserId();
    const creatorId = getProjectCreatorId();
    return loggedInUserId && creatorId && loggedInUserId === creatorId;
  };

  const creatorAccess = isProjectCreator();

  // ============================================
  // ✅ Delete and Leave Functions
  // ============================================

  const handleDeleteProject = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    );
    if (!confirmDelete) {
      return;
    }

    const loggedInUserId = getLoggedInUserId();
    if (!loggedInUserId) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/projects/delete/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deletedBy: loggedInUserId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Failed to delete project");
        return;
      }

      alert("Project deleted successfully.");
      navigate("/student/my-project");
    } catch (error) {
      console.log("Delete Project Error:", error);
      alert("Unable to delete project. Please check backend server.");
    }
  };

  const handleLeaveProject = async () => {
    const confirmLeave = window.confirm(
      "Are you sure you want to leave this project?"
    );
    if (!confirmLeave) {
      return;
    }

    const loggedInUserId = getLoggedInUserId();
    if (!loggedInUserId) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/team/leave/${projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: loggedInUserId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Failed to leave project");
        return;
      }

      alert("You have left the project successfully.");
      navigate("/student/my-project");
    } catch (error) {
      console.log("Leave Project Error:", error);
      alert("Unable to leave project. Please check backend server.");
    }
  };

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('📁 Fetching project:', projectId);
        const response = await getProjectById(projectId);
        console.log('📁 Project fetched:', response.data);
        const projectData = response.data.project;
        setProject(projectData);
        
        // Initialize edit data with project values
        setEditData({
          projectName: projectData.projectName || '',
          projectCategory: projectData.projectCategory || '',
          description: projectData.description || '',
          mission: projectData.mission || '',
          goals: projectData.goals || [],
          problemStatement: projectData.problemStatement || '',
          targetUsers: projectData.targetUsers || '',
          expectedOutcome: projectData.expectedOutcome || '',
          technologyStack: projectData.technologyStack || []
        });
      } catch (err) {
        setError('Failed to load project. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  // ✅ Handle Edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      projectName: project.projectName || '',
      projectCategory: project.projectCategory || '',
      description: project.description || '',
      mission: project.mission || '',
      goals: project.goals || [],
      problemStatement: project.problemStatement || '',
      targetUsers: project.targetUsers || '',
      expectedOutcome: project.expectedOutcome || '',
      technologyStack: project.technologyStack || []
    });
    setSaveError('');
    setSaveSuccess('');
  };

  // ✅ Handle Cancel
  const handleCancel = () => {
    setIsEditing(false);
    setSaveError('');
    setSaveSuccess('');
    setGoalInput('');
    setTechInput('');
  };

  // ✅ Handle Save
  const handleSave = async () => {
    setSaveLoading(true);
    setSaveError('');
    setSaveSuccess('');

    try {
      const updatedData = {
        projectName: editData.projectName,
        projectCategory: editData.projectCategory,
        description: editData.description,
        mission: editData.mission,
        goals: editData.goals,
        problemStatement: editData.problemStatement,
        targetUsers: editData.targetUsers,
        expectedOutcome: editData.expectedOutcome,
        technologyStack: editData.technologyStack
      };

      console.log('📤 Updating project:', updatedData);
      const response = await updateProject(projectId, updatedData);
      console.log('✅ Project updated:', response.data);

      setProject(response.data.project);
      setSaveSuccess('✅ Project details saved successfully!');
      
      setTimeout(() => {
        setIsEditing(false);
        setSaveSuccess('');
      }, 2000);
    } catch (err) {
      console.error('❌ Error updating project:', err);
      setSaveError(err.response?.data?.message || 'Failed to save changes. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Handle adding goal
  const handleAddGoal = () => {
    if (goalInput.trim()) {
      setEditData(prev => ({
        ...prev,
        goals: [...prev.goals, goalInput.trim()]
      }));
      setGoalInput('');
    }
  };

  // ✅ Handle removing goal
  const handleRemoveGoal = (index) => {
    setEditData(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index)
    }));
  };

  // ✅ Handle adding tech
  const handleAddTech = () => {
    if (techInput.trim()) {
      setEditData(prev => ({
        ...prev,
        technologyStack: [...prev.technologyStack, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  // ✅ Handle removing tech
  const handleRemoveTech = (index) => {
    setEditData(prev => ({
      ...prev,
      technologyStack: prev.technologyStack.filter((_, i) => i !== index)
    }));
  };

  // ✅ Render Basic Information Tab (Read-Only)
  const renderBasicInfo = () => {
    if (!project) return null;
    
    return (
      <div className="workspace-tab-content">
        {isEditing ? (
          // ✅ EDIT MODE
          <div className="edit-mode">
            <div className="workspace-info-grid edit-grid">
              <div className="info-item edit-item">
                <span className="info-label">Project Name</span>
                <input
                  type="text"
                  name="projectName"
                  value={editData.projectName}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </div>
              <div className="info-item edit-item">
                <span className="info-label">Category</span>
                <select
                  name="projectCategory"
                  value={editData.projectCategory}
                  onChange={handleInputChange}
                  className="edit-select"
                >
                  <option value="Web Application">Web Application</option>
                  <option value="Mobile Application">Mobile Application</option>
                  <option value="AI/ML Project">AI/ML Project</option>
                  <option value="IoT Project">IoT Project</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Management System">Management System</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="workspace-description edit-description">
              <h4>📝 Description</h4>
              <textarea
                name="description"
                value={editData.description}
                onChange={handleInputChange}
                className="edit-textarea"
                rows="3"
              />
            </div>

            <div className="workspace-description edit-description">
              <h4>🎯 Mission</h4>
              <textarea
                name="mission"
                value={editData.mission}
                onChange={handleInputChange}
                className="edit-textarea"
                rows="2"
              />
            </div>

            <div className="workspace-description edit-description">
              <h4>🎯 Goals</h4>
              <div className="edit-tag-container">
                {editData.goals.map((goal, index) => (
                  <span key={index} className="edit-tag">
                    {goal}
                    <button onClick={() => handleRemoveGoal(index)} className="tag-remove">✕</button>
                  </span>
                ))}
              </div>
              <div className="edit-add-row">
                <input
                  type="text"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  placeholder="Add a goal..."
                  className="edit-input-small"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                />
                <button onClick={handleAddGoal} className="btn btn-add-tag">Add</button>
              </div>
            </div>

            <div className="workspace-description edit-description">
              <h4>❓ Problem Statement</h4>
              <textarea
                name="problemStatement"
                value={editData.problemStatement}
                onChange={handleInputChange}
                className="edit-textarea"
                rows="2"
              />
            </div>

            <div className="workspace-description edit-description">
              <h4>👥 Target Users</h4>
              <textarea
                name="targetUsers"
                value={editData.targetUsers}
                onChange={handleInputChange}
                className="edit-textarea"
                rows="2"
              />
            </div>

            <div className="workspace-description edit-description">
              <h4>📈 Expected Outcome</h4>
              <textarea
                name="expectedOutcome"
                value={editData.expectedOutcome}
                onChange={handleInputChange}
                className="edit-textarea"
                rows="2"
              />
            </div>

            <div className="workspace-description edit-description">
              <h4>🛠️ Technology Stack</h4>
              <div className="edit-tag-container">
                {editData.technologyStack.map((tech, index) => (
                  <span key={index} className="edit-tag tech-tag">
                    {tech}
                    <button onClick={() => handleRemoveTech(index)} className="tag-remove">✕</button>
                  </span>
                ))}
              </div>
              <div className="edit-add-row">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Add a technology..."
                  className="edit-input-small"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTech()}
                />
                <button onClick={handleAddTech} className="btn btn-add-tag">Add</button>
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            <div className="edit-actions">
              {saveError && <div className="edit-error">{saveError}</div>}
              {saveSuccess && <div className="edit-success">{saveSuccess}</div>}
              <div className="edit-buttons">
                <button onClick={handleCancel} className="btn btn-cancel-edit" disabled={saveLoading}>
                  Cancel
                </button>
                <button onClick={handleSave} className="btn btn-save-edit" disabled={saveLoading}>
                  {saveLoading ? (
                    <>
                      <span className="spinner-small"></span> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i> Save Details
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // ✅ READ-ONLY MODE
          <>
            <div className="workspace-info-grid">
              <div className="info-item">
                <span className="info-label">Project Name</span>
                <span className="info-value">{project.projectName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Project Code</span>
                <span className="info-value code-value">{project.projectCode}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Category</span>
                <span className="info-value">{project.projectCategory}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value status-badge">{project.status}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Progress</span>
                <span className="info-value">{project.progress || 0}%</span>
              </div>
              <div className="info-item">
                <span className="info-label">Created</span>
                <span className="info-value">{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Updated</span>
                <span className="info-value">{new Date(project.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="workspace-description">
              <h4>📝 Description</h4>
              <p>{project.description || 'No description provided.'}</p>
            </div>

            <div className="workspace-description">
              <h4>🎯 Mission</h4>
              <p>{project.mission || 'No mission statement provided.'}</p>
            </div>

            <div className="workspace-description">
              <h4>🎯 Goals</h4>
              {project.goals && project.goals.length > 0 ? (
                <ul className="goals-list">
                  {project.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              ) : (
                <p>No goals defined.</p>
              )}
            </div>

            <div className="workspace-description">
              <h4>❓ Problem Statement</h4>
              <p>{project.problemStatement || 'No problem statement provided.'}</p>
            </div>

            <div className="workspace-description">
              <h4>👥 Target Users</h4>
              <p>{project.targetUsers || 'No target users specified.'}</p>
            </div>

            <div className="workspace-description">
              <h4>📈 Expected Outcome</h4>
              <p>{project.expectedOutcome || 'No expected outcome specified.'}</p>
            </div>

            <div className="workspace-description">
              <h4>🛠️ Technology Stack</h4>
              {project.technologyStack && project.technologyStack.length > 0 ? (
                <div className="tech-stack">
                  {project.technologyStack.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              ) : (
                <p>No technologies specified.</p>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  // ✅ Render Placeholder Tabs
  const renderPlaceholder = (tabName) => {
    return (
      <div className="workspace-tab-content placeholder-tab">
        <div className="placeholder-icon">
          {tabs.find(t => t.id === tabName)?.icon}
        </div>
        <h3>{tabs.find(t => t.id === tabName)?.label}</h3>
        <p>This section is coming soon.</p>
        <p className="placeholder-sub">The {tabs.find(t => t.id === tabName)?.label} feature will be available in the next update.</p>
      </div>
    );
  };

  // ✅ Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return renderBasicInfo();
      case 'team':
        return <TeamMembersTab projectId={projectId} isCreator={creatorAccess} />;
      case 'mentor':
        return renderPlaceholder('mentor');
      case 'tasks':
        return renderPlaceholder('tasks');
      case 'communication':
        return renderPlaceholder('communication');
      case 'files':
        return renderPlaceholder('files');
      case 'finances':
        return renderPlaceholder('finances');
      case 'status':
        return renderPlaceholder('status');
      default:
        return renderBasicInfo();
    }
  };

  if (loading) {
    return (
      <div className="student-dashboard-layout">
        <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="student-main-content">
          <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Project Workspace" />
          <main className="student-content-area">
            <div className="content-wrapper">
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading project...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="student-dashboard-layout">
        <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="student-main-content">
          <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Project Workspace" />
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

  if (!project) {
    return (
      <div className="student-dashboard-layout">
        <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="student-main-content">
          <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Project Workspace" />
          <main className="student-content-area">
            <div className="content-wrapper">
              <div className="empty-state">
                <h3>Project not found</h3>
                <button className="btn btn-primary" onClick={() => navigate('/student/my-project')}>
                  Back to My Projects
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
        <StudentTopbar toggleSidebar={toggleSidebar} pageTitle="Project Workspace" />
        <main className="student-content-area">
          <div className="workspace-container">
            
            {/* Back Button */}
            <button 
              className="btn-back" 
              onClick={() => navigate('/student/my-project')}
            >
              <i className="fas fa-arrow-left"></i> Back to Projects
            </button>
  
            {/* Workspace Header - Purple Card */}
            <div className="workspace-header">
              <div className="workspace-header-content">
                <div className="workspace-title">
                  <h1>{project.projectName}</h1>
                  <p className="workspace-subtitle">
                    <span>Project Code:</span>
                    <span className="project-code-badge">{project.projectCode}</span>
                    <span className="workspace-status-dot"></span>
                    <span className="workspace-status-text">{project.status}</span>
                  </p>
                </div>
                
                {/* ✅ Workspace Actions with Delete/Leave Buttons */}
                <div className="workspace-actions">
                  {!isEditing && (
                    <>
                      <button className="btn-edit-workspace" onClick={handleEdit}>
                        <FiEdit3 size={16} /> Edit Details
                      </button>
                      
                      {/* Show Delete or Leave based on user role */}
                      {creatorAccess ? (
                        <button className="btn-delete-project" onClick={handleDeleteProject}>
                          <FiTrash2 size={16} /> Delete Project
                        </button>
                      ) : (
                        <button className="btn-leave-project" onClick={handleLeaveProject}>
                          <FiLogOut size={16} /> Leave Project
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
  
            {/* Tabs */}
            <div className="workspace-tabs-grid">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`workspace-tab-card ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    borderColor: activeTab === tab.id ? tab.color : '#f0f0f0',
                    background: activeTab === tab.id ? tab.color : '#fff',
                    color: activeTab === tab.id ? '#fff' : '#888'
                  }}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                  {activeTab !== tab.id && (
                    <span className="tab-indicator" style={{ background: tab.color }}></span>
                  )}
                </button>
              ))}
            </div>
  
            {/* Tab Content */}
            <div className="workspace-tab-content-wrapper">
              {renderTabContent()}
            </div>
  
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentProjectWorkspace;