import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Project from '../models/Project.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();

    const adminUser = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      isAdmin: true,
    };

    const createdUsers = await User.create([adminUser]);
    const adminId = createdUsers[0]._id;

    const sampleProjects = [
      {
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce platform built with MERN stack.',
        category: 'Web Dev',
        images: ['https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop'],
        sourceCodeUrl: 'https://github.com/example/ecommerce',
        techStack: ['MongoDB', 'Express', 'React', 'Node.js'],
        difficulty: 'Intermediate',
        user: adminId
      },
      {
        title: 'Machine Learning Image Classifier',
        description: 'An AI model trained to classify images using TensorFlow.',
        category: 'AI',
        images: ['https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop'],
        sourceCodeUrl: 'https://github.com/example/ml-classifier',
        techStack: ['Python', 'TensorFlow', 'Keras'],
        difficulty: 'Advanced',
        user: adminId
      },
      {
        title: 'Blockchain Voting App',
        description: 'A decentralized voting application on the Ethereum blockchain.',
        category: 'Blockchain',
        images: ['https://images.unsplash.com/photo-1639762681485-074b7f4f2508?q=80&w=1000&auto=format&fit=crop'],
        sourceCodeUrl: 'https://github.com/example/voting-app',
        techStack: ['Solidity', 'React', 'Web3.js'],
        difficulty: 'Advanced',
        user: adminId
      },
      {
        title: 'Secure Chat App',
        description: 'End-to-end encrypted chat application.',
        category: 'Cybersecurity',
        images: ['https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop'],
        sourceCodeUrl: 'https://github.com/example/secure-chat',
        techStack: ['Node.js', 'Socket.io', 'Crypto'],
        difficulty: 'Intermediate',
        user: adminId
      }
    ];

    await Project.insertMany(sampleProjects);

    console.log('Data Seeded!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
