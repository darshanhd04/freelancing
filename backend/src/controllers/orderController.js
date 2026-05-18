import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Project from '../models/Project.js';

// @desc    Create Project Request (formerly Order)
// @route   POST /api/orders/create
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { projectId } = req.body;

  const project = await Project.findById(projectId);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if user already requested
  const user = await User.findById(req.user._id);
  if (user.purchasedProjects.includes(projectId)) {
    res.status(400);
    throw new Error('You have already requested this project');
  }

  // Save order to DB
  const newOrder = await Order.create({
    user: req.user._id,
    project: projectId,
    status: 'Completed', // Automatically mark as completed for free access
  });

  // Add project to user's purchased array
  user.purchasedProjects.push(projectId);
  await user.save();

  res.json({
    message: 'Project requested successfully',
    sourceCodeUrl: project.sourceCodeUrl,
    dbOrderId: newOrder._id,
  });
});

export { createOrder };
