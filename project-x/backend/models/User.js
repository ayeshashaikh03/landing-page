const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ✅ FIXED: Using consistent variable name
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide a full name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['Student', 'Mentor'],
    default: 'Student'
  },
  
  // 1. Phone Number
  phone: {
    type: String,
    default: "",
    trim: true,
  },
  
  // 2. Location
  location: {
    type: String,
    default: "",
    trim: true,
  },
  
  // 3. Branch/Department
  branch: {
    type: String,
    default: "",
    trim: true,
  },
  
  // 4. Bio / About
  bio: {
    type: String,
    default: "",
    trim: true,
  },
  
  // 5. Skills (Array of strings)
  skills: {
    type: [String],
    default: [],
  },
  
  // 6. LinkedIn URL
  linkedin: {
    type: String,
    default: "",
    trim: true,
  },
  
  // 7. GitHub URL
  github: {
    type: String,
    default: "",
    trim: true,
  },
  
  // 8. Portfolio URL
  portfolio: {
    type: String,
    default: "",
    trim: true,
  },
  
  // 9. Profile Image URL
  profileImage: {
    type: String,
    default: "",
    trim: true,
  },
 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// ✅ FIXED: Using the correct variable name
const User = mongoose.model("User", userSchema);
module.exports = User;