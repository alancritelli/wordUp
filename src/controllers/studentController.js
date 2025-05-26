const Student = require('../models/Student')

const createStudent = async (req, res) => {
  try {
    const { name, email, whatsapp, progressLevel } = req.body
    const newStudent = new Student({ name, email, whatsapp, progressLevel })
    await newStudent.save()
    res.status(201).json(newStudent)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error creating student', details: error.message })
  }
}

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
    res.json(students)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching students', details: error.message })
  }
}

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) return res.status(404).json({ error: 'Student not found' })
    res.json(student)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching student', details: error.message })
  }
}

const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedStudent)
      return res.status(404).json({ error: 'Student not found' })
    res.json(updatedStudent)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error updating student', details: error.message })
  }
}

const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id)
    if (!deletedStudent)
      return res.status(404).json({ error: 'Student not found' })
    res.json({ message: 'Student deleted successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error deleting student', details: error.message })
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
}
