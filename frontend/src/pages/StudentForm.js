// src/pages/StudentForm.js
import React, { useState } from 'react'
import axios from 'axios'
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem
} from '@mui/material'

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    whatsapp: '',
    progressLevel: ''
  })

  const handleChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/students',
        student
      )
      console.log('Aluno cadastrado:', response.data)
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Novo Aluno
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          name="name"
          label="Nome"
          value={student.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          name="email"
          label="Email"
          value={student.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          name="whatsapp"
          label="Whatsapp"
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
          <MenuItem value="Basic">Iniciante</MenuItem>
          <MenuItem value="Intermediate">Intermediario</MenuItem>
          <MenuItem value="Advanced">Avançado</MenuItem>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Cadastrar
        </Button>
      </Box>
    </Container>
  )
}

export default StudentForm
