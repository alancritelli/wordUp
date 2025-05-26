const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  content: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: {
    type: String,
    enum: ['completed', 'pending', 'overdue'],
    required: true
  }
})

const Feedback = mongoose.model('Feedback', FeedbackSchema)
module.exports = Feedback
