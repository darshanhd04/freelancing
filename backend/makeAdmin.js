import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    // Update ALL users to be admins so the user doesn't get locked out
    const result = await User.updateMany({}, { $set: { isAdmin: true } });
    
    console.log(`Successfully updated ${result.modifiedCount} user(s) to Admin status.`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

makeAdmin();
