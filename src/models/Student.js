const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  whatsapp: { type: String, required: true, unique: true }, // Novo campo
  progressLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  createdAt: { type: Date, default: Date.now }
})

const Student = mongoose.model('Student', studentSchema)
module.exports = Student
