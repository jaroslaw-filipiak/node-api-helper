const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to database...');
    const dbURI =
      process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_ATLAS_URI
        : process.env.MONGODB_LOCAL_URI;

    if (!dbURI) {
      throw new Error(
        'Database URI is not defined. Please set the environment variables.'
      );
    }

    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(dbURI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
