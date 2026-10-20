import React, { useState } from 'react';
import { createProject } from '../services/api';

const CreateProjectModal = ({ isOpen, onClose, onCreateProject }) => {
  const [projectName, setProjectName] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ Updated Project categories for Week 6
  const categories = [
    'Web Application',
    'Mobile Application',
    'AI/ML Project',
    'IoT Project',
    'E-Commerce',
    'Management System',
    'Other'
  ];

  // Reset form when modal closes
  const resetForm = () => {
    setProjectName('');
    setCategory('');
    setError('');
    setSuccess('');
    setIsLoading(false);
  };

  // Handle modal close
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate fields
    if (!projectName.trim()) {
      setError('Please enter a project name');
      return;
    }
    
    if (!category) {
      setError('Please select a project category');
      return;
    }

    setError('');
    setIsLoading(true);
    setSuccess('');

    try {
      // Get user ID from localStorage
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      
      if (!user || !user.id) {
        setError('User not found. Please login again.');
        setIsLoading(false);
        return;
      }

      console.log('📤 Creating project:', {
        projectName: projectName.trim(),
        projectCategory: category,
        createdBy: user.id
      });

      // Call the API
      const response = await createProject({
        projectName: projectName.trim(),
        projectCategory: category,
        createdBy: user.id
      });

      console.log('✅ Project created:', response.data);
      
      setSuccess('✅ Project created successfully!');
      
      // Call parent function with project data
      onCreateProject({
        id: response.data.data.project.id,
        name: response.data.data.project.projectName,
        category: response.data.data.project.projectCategory,
        status: response.data.data.project.status,
        progress: response.data.data.project.progress,
        projectCode: response.data.data.project.projectCode
      });

      // Close modal after delay
      setTimeout(() => {
        resetForm();
        onClose();
      }, 1500);
      
    } catch (err) {
      console.error('❌ Error creating project:', err);
      
      // Get error message from response
      const errorMessage = err.response?.data?.message || 'Failed to create project. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // If modal is not open, don't render
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <i className="fas fa-plus-circle"></i> Create New Project
          </h2>
          <button className="modal-close" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Error Message */}
          {error && (
            <div className="modal-message error">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="modal-message success">
              <i className="fas fa-check-circle"></i>
              {success}
            </div>
          )}

          {/* Project Name Input */}
          <div className="form-group">
            <label htmlFor="projectName">
              <i className="fas fa-project-diagram"></i> Project Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="projectName"
              placeholder="Enter your project name"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                if (error) setError('');
              }}
              disabled={isLoading}
              className={error && !projectName.trim() ? 'error' : ''}
            />
          </div>

          {/* Project Category Dropdown */}
          <div className="form-group">
            <label htmlFor="category">
              <i className="fas fa-tag"></i> Project Category <span className="required">*</span>
            </label>
            <div className="select-wrapper">
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (error) setError('');
                }}
                disabled={isLoading}
                className={error && !category ? 'error' : ''}
              >
                <option value="">Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-cancel" 
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-create"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span> Creating...
                </>
              ) : (
                <>
                  <i className="fas fa-rocket"></i> Create Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;