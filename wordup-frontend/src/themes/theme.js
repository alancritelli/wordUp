// src/themes/theme.js
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366' // Exemplo: azul escuro
    },
    secondary: {
      main: '#FF6600' // Exemplo: laranja
    }
  },
  typography: {
    fontFamily: '"Roboto", sans-serif' // Altere para a fonte da identidade visual
  }
})

export default theme
