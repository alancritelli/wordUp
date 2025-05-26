// src/controllers/feedbackController.js
const Feedback = require('../models/Feedback')
const Student = require('../models/Student')

// Cria um novo feedback
exports.createFeedback = async (req, res) => {
  try {
    const { studentId, content, teacherComment, deadline, status } = req.body

    // Busca o aluno utilizando o campo numérico studentId
    const student = await Student.findOne({ studentId: Number(studentId) })
    if (!student) {
      return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    // Cria o feedback vinculando o ObjectId do aluno encontrado
    const feedback = await Feedback.create({
      student: student._id,
      content,
      teacherComment,
      deadline,
      status
    })

    res.status(201).json(feedback)
  } catch (error) {
    console.error('Erro ao criar feedback:', error)
    res.status(500).json({ error: 'Erro ao criar feedback' })
  }
}

// Retorna todos os feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('student') // Popula dados do aluno, se necessário
    res.status(200).json(feedbacks)
  } catch (error) {
    console.error('Erro ao buscar feedbacks:', error)
    res.status(500).json({ error: 'Erro ao buscar feedbacks' })
  }
}

// Retorna um feedback pelo ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('student')
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback não encontrado' })
    }
    res.status(200).json(feedback)
  } catch (error) {
    console.error('Erro ao buscar feedback:', error)
    res.status(500).json({ error: 'Erro ao buscar feedback' })
  }
}

// Atualiza um feedback pelo ID
exports.updateFeedback = async (req, res) => {
  try {
    const { content, teacherComment, deadline, status } = req.body
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { content, teacherComment, deadline, status },
      { new: true }
    )
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback não encontrado' })
    }
    res.status(200).json(feedback)
  } catch (error) {
    console.error('Erro ao atualizar feedback:', error)
    res.status(500).json({ error: 'Erro ao atualizar feedback' })
  }
}

// Deleta um feedback pelo ID
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id)
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback não encontrado' })
    }
    res.status(200).json({ message: 'Feedback deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar feedback:', error)
    res.status(500).json({ error: 'Erro ao deletar feedback' })
  }
}
