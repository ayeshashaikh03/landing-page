const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('📞 Attempting to connect to MongoDB...');
  
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/projectx';
  console.log(`🔗 Connection URI: ${mongoURI}`);
  
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    console.log('💡 Make sure MongoDB is installed and running');
    console.log('💡 Try: brew services start mongodb-community');
    process.exit(1);
  }
};

module.exports = connectDB;