// src/pages/FeedbackForm.js
import React, { useState } from 'react'
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
  const [feedback, setFeedback] = useState({
    studentId: '',
    content: '',
    deadline: '',
    status: 'pending'
  })

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
      // Opcional: limpar o formulário após o envio
      setFeedback({
        studentId: '',
        content: '',
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
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          name="studentId"
          label="ID do Aluno"
          value={feedback.studentId}
          onChange={handleChange}
          required
        />
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
