// src/services/api.js
import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// AUTH API CALLS
// ============================================

export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

// ============================================
// PROJECT API CALLS
// ============================================

// Create a new project
export const createProject = (projectData) => API.post('/projects/create', projectData);

// ✅ Get all projects for a specific user
export const getMyProjects = (userId) => API.get(`/projects/my-projects/${userId}`);

// Get a single project by ID
export const getProjectById = (id) => API.get(`/projects/details/${id}`);



// Update a project
export const updateProject = (id, projectData) => API.put(`/projects/update/${id}`, projectData);

export default API;

// Delete a project (creator only)
export const deleteProject = (projectId, data) => API.delete(`/projects/delete/${projectId}`, { data });

// Leave a project (member only)
export const leaveProject = (projectId, data) => API.put(`/team/leave/${projectId}`, data);