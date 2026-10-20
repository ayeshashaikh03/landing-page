const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const TeamMember = require('../models/TeamMember');
const User = require('../models/User');

// ============================================
// PUT /api/team/leave/:projectId - Leave a project
// ============================================
router.put('/leave/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

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
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
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
    if (project.createdBy.toString() === userId.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Project creator cannot leave the project. Creator can delete the project.'
      });
    }

    // 6. Find active membership
    const member = await TeamMember.findOne({
      projectId: projectId,
      userId: userId,
      memberStatus: 'Active'
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Active membership not found'
      });
    }

    // 7. Update member status to Left
    member.memberStatus = 'Left';
    member.leftAt = new Date();
    await member.save();

    // 8. Return success response
    return res.status(200).json({
      success: true,
      message: 'You have left the project successfully',
      member: member
    });

  } catch (error) {
    console.log('Leave Project Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while leaving project'
    });
  }
});

// ============================================
// GET /api/team-members/:projectId - Get all team members
// ============================================
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    // Validate project ID
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Project ID'
      });
    }

    // Find all team members for this project
    const members = await TeamMember.find({ projectId })
      .populate('userId', 'fullName email role profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Team members fetched successfully',
      count: members.length,
      members: members
    });

  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// ============================================
// POST /api/team-members/add - Add a team member
// ============================================
router.post('/add', async (req, res) => {
  try {
    const { projectId, userId, role, addedBy } = req.body;

    // Validate required fields
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: 'Project ID is required'
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Project ID or User ID'
      });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if member already exists
    const existingMember = await TeamMember.findOne({ projectId, userId });
    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member of this project'
      });
    }

    // Create team member
    const member = new TeamMember({
      projectId,
      userId,
      role: role || 'Developer',
      memberStatus: 'Active'
    });

    await member.save();

    // Populate user details for response
    const populatedMember = await TeamMember.findById(member._id)
      .populate('userId', 'fullName email role profileImage');

    res.status(201).json({
      success: true,
      message: 'Team member added successfully',
      member: populatedMember
    });

  } catch (error) {
    console.error('Error adding team member:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// ============================================
// PUT /api/team-members/update-status/:memberId - Update member status
// ============================================
router.put('/update-status/:memberId', async (req, res) => {
  try {
    const { memberId } = req.params;
    const { memberStatus } = req.body;

    // Validate member ID
    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Member ID'
      });
    }

    // Validate status
    const validStatuses = ['Pending', 'Active', 'Rejected', 'Left'];
    if (!memberStatus || !validStatuses.includes(memberStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: Pending, Active, Rejected, or Left'
      });
    }

    // Find and update member
    const member = await TeamMember.findByIdAndUpdate(
      memberId,
      { 
        memberStatus,
        ...(memberStatus === 'Left' && { leftAt: new Date() })
      },
      { new: true }
    ).populate('userId', 'fullName email role profileImage');

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Member status updated successfully',
      member: member
    });

  } catch (error) {
    console.error('Error updating member status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// ============================================
// DELETE /api/team-members/remove/:memberId - Remove a team member
// ============================================
router.delete('/remove/:memberId', async (req, res) => {
  try {
    const { memberId } = req.params;

    // Validate member ID
    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Member ID'
      });
    }

    // Find and delete member
    const member = await TeamMember.findByIdAndDelete(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member removed successfully'
    });

  } catch (error) {
    console.error('Error removing team member:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});


module.exports = router;