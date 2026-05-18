import mongoose from 'mongoose';

const requirementSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
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
    budget: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'In Progress', 'Completed', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Requirement = mongoose.model('Requirement', requirementSchema);

export default Requirement;
