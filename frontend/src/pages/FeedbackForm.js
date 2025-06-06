// src/pages/FeedbackForm.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem
} from '@mui/material'

const FeedbackForm = () => {
  // Estado para armazenar a lista de alunos
  const [students, setStudents] = useState([])
  // Estado para os dados do feedback, incluindo o comentário livre do professor
  const [feedback, setFeedback] = useState({
    studentId: '', // Este será um número selecionado do dropdown
    content: '', // Outra informação que você pode querer
    teacherComment: '', // Campo para o professor escrever livremente
    deadline: '',
    status: 'pending'
  })

  // Carrega a lista de alunos assim que o componente monta
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Erro ao buscar alunos:', error))
  }, [])

  const handleChange = e => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/feedbacks',
        feedback
      )
      console.log('Feedback cadastrado:', response.data)
      // Limpa os campos do formulário após o envio
      setFeedback({
        studentId: '',
        content: '',
        teacherComment: '',
        deadline: '',
        status: 'pending'
      })
    } catch (error) {
      console.error('Erro ao cadastrar feedback:', error)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Novo Feedback
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Campo para selecionar o aluno pelo studentId */}
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          select
          name="studentId"
          label="Aluno"
          value={feedback.studentId}
          onChange={handleChange}
          required
        >
          {students.map(student => (
            <MenuItem key={student.studentId} value={student.studentId}>
              {student.studentId} - {student.name}
            </MenuItem>
          ))}
        </TextField>
        {/* Campo para o conteúdo do feedback, se necessário */}
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          name="content"
          label="Conteúdo"
          value={feedback.content}
          onChange={handleChange}
          required
        />
        {/* Campo para o comentário livre do professor */}
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          name="teacherComment"
          label="Comentário do Professor"
          multiline
          rows={4}
          value={feedback.teacherComment}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          name="deadline"
          label="Prazo"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={feedback.deadline}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          select
          name="status"
          label="Status"
          value={feedback.status}
          onChange={handleChange}
          required
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in-progress">In-Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Enviar Feedback
        </Button>
      </Box>
    </Container>
  )
}

export default FeedbackForm
