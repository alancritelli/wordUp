// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material'
import theme from './themes/theme'
import StudentList from './pages/StudentList'
import StudentForm from './pages/StudentForm'
import StudentEdit from './pages/StudentEdit' // NOVO: Página de edição de aluno
import FeedbackList from './pages/FeedbackList'
import FeedbackForm from './pages/FeedbackForm'
import FeedbackEdit from './pages/FeedbackEdit' // NOVO: Página de edição de feedback

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              WordUp!
            </Typography>
            <Button color="inherit" component={Link} to="/students">
              Alunos
            </Button>
            <Button color="inherit" component={Link} to="/students/new">
              Novo Aluno
            </Button>
            <Button color="inherit" component={Link} to="/feedbacks">
              Feedbacks
            </Button>
            <Button color="inherit" component={Link} to="/feedbacks/new">
              Novo Feedback
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/new" element={<StudentForm />} />
            <Route path="/students/edit/:studentId" element={<StudentEdit />} />
            <Route path="/feedbacks" element={<FeedbackList />} />
            <Route path="/feedbacks/new" element={<FeedbackForm />} />
            <Route
              path="/feedbacks/edit/:feedbackId"
              element={<FeedbackEdit />}
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  )
}

export default App
