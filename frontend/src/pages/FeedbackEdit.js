// src/pages/FeedbackEdit.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Snackbar
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { useParams, useNavigate } from 'react-router-dom'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const FeedbackEdit = () => {
  const { feedbackId } = useParams()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState({
    studentId: '',
    content: '',
    deadline: '',
    status: 'pending'
  })
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/feedbacks/${feedbackId}`)
      .then(response => {
        setFeedback(response.data)
      })
      .catch(error => {
        console.error('Erro ao buscar feedback:', error)
      })
  }, [feedbackId])

  const handleChange = e => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value })
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.put(
        `http://localhost:5000/api/feedbacks/${feedbackId}`,
        feedback
      )
      setSnackbarMessage('Feedback atualizado com sucesso!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setTimeout(() => {
        navigate('/feedbacks')
      }, 2000)
    } catch (err) {
      console.error('Erro ao atualizar feedback:', err)
      setSnackbarMessage('Erro ao atualizar feedback!')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Editar Feedback
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
          value={feedback.deadline ? feedback.deadline.substring(0, 10) : ''}
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
          Atualizar Feedback
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default FeedbackEdit
