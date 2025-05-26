// src/models/Feedback.js
const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    teacherComment: {
      type: String, // Campo para o professor inserir alguma observação livre
      default: '' // Pode ficar vazio se não for preenchido
    },
    deadline: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Feedback', FeedbackSchema)
