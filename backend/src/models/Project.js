import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['AI', 'Web Dev', 'Blockchain', 'Cybersecurity', 'Other'],
    },
    images: [
      {
        type: String,
      },
    ],
    video: {
      type: String,
    },
    sourceCodeUrl: {
      type: String,
      required: true, // Link to the actual code to be provided upon purchase
    },
    techStack: [
      {
        type: String,
      },
    ],
    difficulty: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Admin who created it
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
