import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const category = req.query.category ? { category: req.query.category } : {};

  const projects = await Project.find({ ...keyword, ...category });
  res.json(projects);
});

// @desc    Fetch single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
  const { title, description, category, images, video, sourceCodeUrl, techStack, difficulty } = req.body;

  const project = new Project({
    title,
    description,
    category,
    images,
    video,
    sourceCodeUrl,
    techStack,
    difficulty,
    user: req.user._id,
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
  const { title, description, category, images, video, sourceCodeUrl, techStack, difficulty } = req.body;

  const project = await Project.findById(req.params.id);

  if (project) {
    project.title = title || project.title;
    project.description = description || project.description;
    project.category = category || project.category;
    project.images = images || project.images;
    project.video = video || project.video;
    project.sourceCodeUrl = sourceCodeUrl || project.sourceCodeUrl;
    project.techStack = techStack || project.techStack;
    project.difficulty = difficulty || project.difficulty;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

export { getProjects, getProjectById, createProject, updateProject, deleteProject };
