import asyncHandler from 'express-async-handler';
import Requirement from '../models/Requirement.js';

// @desc    Create a new custom requirement
// @route   POST /api/requirements
// @access  Private
const createRequirement = asyncHandler(async (req, res) => {
  const { title, description, category, budget } = req.body;

  if (!title || !description || !category || !budget) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const requirement = new Requirement({
    user: req.user._id,
    title,
    description,
    category,
    budget,
  });

  const createdRequirement = await requirement.save();
  res.status(201).json(createdRequirement);
});

// @desc    Get all custom requirements
// @route   GET /api/requirements
// @access  Private/Admin
const getRequirements = asyncHandler(async (req, res) => {
  const requirements = await Requirement.find({}).populate('user', 'id name email');
  res.json(requirements);
});

// @desc    Get logged in user's requirements
// @route   GET /api/requirements/myrequirements
// @access  Private
const getMyRequirements = asyncHandler(async (req, res) => {
  const requirements = await Requirement.find({ user: req.user._id });
  res.json(requirements);
});

export { createRequirement, getRequirements, getMyRequirements };
