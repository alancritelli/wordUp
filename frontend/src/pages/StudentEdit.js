// src/pages/StudentEdit.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  MenuItem
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { useParams, useNavigate } from 'react-router-dom'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const StudentEdit = () => {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState({
    name: '',
    email: '',
    whatsapp: '',
    progressLevel: ''
  })
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/students/${studentId}`)
      .then(response => {
        setStudent(response.data)
      })
      .catch(error => {
        console.error('Erro ao buscar dados do aluno:', error)
      })
  }, [studentId])

  const handleChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.put(
        `http://localhost:5000/api/students/${studentId}`,
        student
      )
      setSnackbarMessage('Aluno atualizado com sucesso!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setTimeout(() => {
        navigate('/students')
      }, 2000)
    } catch (err) {
      console.error('Erro ao atualizar aluno:', err)
      setSnackbarMessage('Erro ao atualizar aluno!')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Editar Aluno
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Nome"
          name="name"
          value={student.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={student.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Whatsapp"
          name="whatsapp"
          value={student.whatsapp}
          onChange={handleChange}
          required
        />
        {/* Campo de Nível de Progresso como seleção */}
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          select
          name="progressLevel"
          label="Nível de Progresso"
          value={student.progressLevel}
          onChange={handleChange}
          required
        >
          <MenuItem value="Basic">Basic</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Atualizar
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

export default StudentEdit
