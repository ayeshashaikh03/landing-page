const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    // ============================================
    // BASIC INFORMATION
    // ============================================
    
    // 1. Project Name - Required
    projectName: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      minlength: [3, 'Project name must be at least 3 characters'],
      maxlength: [100, 'Project name cannot exceed 100 characters']
    },
    
    // 2. Project Category - Required
    projectCategory: {
      type: String,
      required: [true, 'Project category is required'],
      enum: [
        'Web Application',
        'Mobile Application',
        'AI/ML Project',
        'IoT Project',
        'E-Commerce',
        'Management System',
        'Other'
      ]
    },
    
    // 3. Project Code - Auto-generated, Unique
    projectCode: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true
    },
    
    // 4. Created By - Reference to User
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    
    // 5. Status - Default: 'Active'
    status: {
      type: String,
      enum: ['Active', 'In Progress', 'Completed', 'On Hold'],
      default: 'Active'
    },
    
    // ============================================
    // NEW FIELDS FOR WEEK 6
    // ============================================
    
    // 6. Description - Project overview
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: ''
    },
    
    // 7. Mission - Project mission statement
    mission: {
      type: String,
      maxlength: [500, 'Mission cannot exceed 500 characters'],
      default: ''
    },
    
    // 8. Goals - Array of goals
    goals: {
      type: [String],
      default: []
    },
    
    // 9. Problem Statement - What problem does this solve?
    problemStatement: {
      type: String,
      maxlength: [1000, 'Problem statement cannot exceed 1000 characters'],
      default: ''
    },
    
    // 10. Target Users - Who is this for?
    targetUsers: {
      type: String,
      maxlength: [500, 'Target users cannot exceed 500 characters'],
      default: ''
    },
    
    // 11. Expected Outcome - What will be achieved?
    expectedOutcome: {
      type: String,
      maxlength: [500, 'Expected outcome cannot exceed 500 characters'],
      default: ''
    },
    
    // 12. Technology Stack - Array of technologies
    technologyStack: {
      type: [String],
      default: []
    },
    
    // ============================================
    // PROGRESS & TEAM (Existing)
    // ============================================
    
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    
    teamMembers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        role: {
          type: String,
          enum: ['Project Lead', 'Developer', 'Designer', 'Tester', 'Mentor'],
          default: 'Developer'
        }
      }
    ]
  },
  {
    // 13. createdAt & 14. updatedAt - Auto-managed
    timestamps: true
  }
);

// ============================================
// Generate unique project code before saving
// ============================================
ProjectSchema.pre('save', async function(next) {
  if (!this.projectCode) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.projectCode = `PRJ-${timestamp}-${random}`;
  }
  next();
});

// ============================================
// Method to get project with user details
// ============================================
ProjectSchema.methods.getProjectWithUser = async function() {
  return await this.populate('createdBy', 'fullName email role');
};

module.exports = mongoose.model('Project', ProjectSchema);