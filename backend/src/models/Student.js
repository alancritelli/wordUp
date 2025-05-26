// src/models/Student.js
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const StudentSchema = new mongoose.Schema({
  studentId: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  whatsapp: { type: String, required: true },
  progressLevel: { type: String, required: true }
})

// Plugin para incrementar o campo studentId a partir de 1
StudentSchema.plugin(AutoIncrement, { inc_field: 'studentId', start_seq: 1 })

// Configurar a transformação na conversão para JSON
StudentSchema.set('toJSON', {
  transform: (doc, ret) => {
    // biome-ignore lint/performance/noDelete: <explanation>
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('Student', StudentSchema)
