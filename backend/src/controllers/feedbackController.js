const Feedback = require('../models/Feedback')
const Student = require('../models/Student')

const createFeedback = async (req, res) => {
  try {
    const { studentId, content, deadline, status } = req.body
    const student = await Student.findById(studentId)
    if (!student) return res.status(404).json({ error: 'Student not found' })

    const newFeedback = new Feedback({
      student: studentId,
      content,
      deadline,
      status
    })
    await newFeedback.save()
    res.status(201).json(newFeedback)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error creating feedback', details: error.message })
  }
}

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate(
      'student',
      'name email whatsapp'
    )
    res.json(feedbacks)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching feedbacks', details: error.message })
  }
}

const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate(
      'student',
      'name email whatsapp'
    )
    if (!feedback) return res.status(404).json({ error: 'Feedback not found' })
    res.json(feedback)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching feedback', details: error.message })
  }
}

const updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedFeedback)
      return res.status(404).json({ error: 'Feedback not found' })
    res.json(updatedFeedback)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error updating feedback', details: error.message })
  }
}

const deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id)
    if (!deletedFeedback)
      return res.status(404).json({ error: 'Feedback not found' })
    res.json({ message: 'Feedback deleted successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error deleting feedback', details: error.message })
  }
}

module.exports = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
}
