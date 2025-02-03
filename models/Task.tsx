import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Backlog', 'In Progress', 'Ongoing', 'Review', 'Completed'],
  },
  adminComments: String,
  employeeComments: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
