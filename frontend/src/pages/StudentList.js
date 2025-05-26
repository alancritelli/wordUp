// src/pages/StudentList.js
import React, { useEffect, useState } from 'react'
import { getStudents } from '../services/api'
import { Card, CardContent, Typography, Grid } from '@mui/material'

const StudentList = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    getStudents()
      .then(data => setStudents(data))
      .catch(err => console.error('Erro ao buscar alunos:', err))
  }, [])

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Lista de Alunos
      </Typography>
      <Grid container spacing={2}>
        {students.map(student => (
          <Grid item xs={12} sm={6} md={4} key={student._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{student.name}</Typography>
                <Typography variant="body2">{student.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default StudentList
