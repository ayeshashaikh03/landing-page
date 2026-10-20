const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const mongoose = require('mongoose');
const TeamMember = require('../models/TeamMember');

// ============================================
// POST /api/projects/create - Create a new project
// ============================================
router.post('/create', async (req, res) => {
  try {
    const { projectName, projectCategory, createdBy } = req.body;

    // Validate empty fields
    if (!projectName) {
      return res.status(400).json({
        success: false,
        message: 'Project name is required'
      });
    }

    if (!projectCategory) {
      return res.status(400).json({
        success: false,
        message: 'Project category is required'
      });
    }

    if (!createdBy) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Validate user ID format
    const isValidObjectId = (id) => {
      return /^[0-9a-fA-F]{24}$/.test(id);
    };

    if (!isValidObjectId(createdBy)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    // Check for duplicate project name
    const existingProject = await Project.findOne({
      projectName: { $regex: new RegExp(`^${projectName}$`, 'i') },
      createdBy: createdBy
    });

    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: 'You already have a project with this name'
      });
    }

    // Create new project
    const project = new Project({
      projectName: projectName.trim(),
      projectCategory,
      createdBy
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: {
        project: {
          id: project._id,
          projectName: project.projectName,
          projectCategory: project.projectCategory,
          projectCode: project.projectCode,
          status: project.status,
          progress: project.progress,
          createdAt: project.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Error creating project:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Project code generation failed. Please try again.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// ============================================
// ✅ GET /api/projects/details/:projectId - Get a single project (SPECIFIC ROUTE FIRST)
// ============================================
router.get('/details/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    console.log('📁 Fetching project with ID:', projectId);

    // Validate project ID format
    const isValidObjectId = (id) => {
      return /^[0-9a-fA-F]{24}$/.test(id);
    };

    if (!isValidObjectId(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format'
      });
    }

    // Find project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project fetched successfully',
      project: project
    });

  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// ============================================
// ✅ GET /api/projects/my-projects/:userId - Get all projects for a user (GENERIC ROUTE SECOND)
// ============================================
router.get('/my-projects/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    console.log('📁 Fetching projects for user:', userId);

    // Validate user ID format
    const isValidObjectId = (id) => {
      return /^[0-9a-fA-F]{24}$/.test(id);
    };

    if (!isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    // Fetch projects using createdBy, sort latest first
    const projects = await Project.find({ createdBy: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Projects fetched successfully',
      count: projects.length,
      projects: projects
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// ============================================
// PUT /api/projects/update/:id - Update a project
// ============================================
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate project ID format
    const isValidObjectId = (id) => {
      return /^[0-9a-fA-F]{24}$/.test(id);
    };

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format'
      });
    }

    // Find and update project
    const project = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project: project
    });

  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// ============================================
// GET /api/projects/:id - Get a project by ID (FALLBACK ROUTE - KEEP LAST)
// ============================================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const isValidObjectId = (id) => {
      return /^[0-9a-fA-F]{24}$/.test(id);
    };

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format'
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project fetched successfully',
      project: project
    });

  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// ============================================
// DELETE /api/projects/delete/:projectId - Delete a project
// ============================================
router.delete('/delete/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { deletedBy } = req.body;

    // 1. Validate project ID
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: 'Project ID is required'
      });
    }

    // 2. Validate project ID format
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Project ID'
      });
    }

    // 3. Validate user ID
    if (!deletedBy || !mongoose.Types.ObjectId.isValid(deletedBy)) {
      return res.status(400).json({
        success: false,
        message: 'Valid user ID is required'
      });
    }

    // 4. Find the project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // 5. Check if user is the project creator
    if (project.createdBy.toString() !== deletedBy.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only project creator can delete this project'
      });
    }

    // 6. Delete all team members associated with this project
    await TeamMember.deleteMany({ projectId: projectId });

    // 7. Delete the project
    await Project.findByIdAndDelete(projectId);

    // 8. Return success response
    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.log('Delete Project Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting project'
    });
  }
});

module.exports = router;