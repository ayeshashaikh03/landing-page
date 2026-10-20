const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROUTES
// ============================================

// Auth Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Project Routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

//TeamMember Routes
const teamMemberRoutes = require('./routes/teamMemberRoutes');
app.use('/api/team-members', teamMemberRoutes);

// ============================================
// Basic route
app.get('/', (req, res) => {
  res.send('🚀 Project X Backend is running!');
});

// ============================================
// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});