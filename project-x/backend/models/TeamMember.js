const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema(
  {
    // Reference to the project
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project ID is required']
    },
    
    // Reference to the user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    
    // Role in the project
    role: {
      type: String,
      //enum: ['Project Lead', 'Developer', 'Designer', 'Tester', 'Mentor'],
      default: 'Developer'
    },
    
    // ✅ Member Status - Updated with "Left"
    memberStatus: {
      type: String,
      enum: ['Pending', 'Active', 'Rejected', 'Left'],
      default: 'Pending'
    },
    
    // ✅ Left At - When member left the project
    leftAt: {
      type: Date,
      default: null
    },
    
    // When member joined
    joinedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model('TeamMember', TeamMemberSchema);