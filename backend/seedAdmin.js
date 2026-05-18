import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin'; // simple password for testing

    // Check if admin already exists
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      // If exists, make sure it's an admin and update password to 'admin'
      // The User model has a pre-save hook that hashes the password automatically
      adminExists.password = adminPassword;
      adminExists.isAdmin = true;
      await adminExists.save();
      console.log('Admin user updated. Email: admin@example.com | Password: admin');
    } else {
      // Create new admin
      const user = new User({
        name: 'System Admin',
        email: adminEmail,
        password: adminPassword,
        isAdmin: true,
      });
      await user.save();
      console.log('Admin user created. Email: admin@example.com | Password: admin');
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
