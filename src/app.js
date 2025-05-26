const express = require('express')
const connectDB = require('./config/db')
const studentRoutes = require('./routes/studentRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')

const app = express()
app.use(express.json())

connectDB() // Conectar ao MongoDB

// Registrar rotas
app.use('/api', studentRoutes)
app.use('/api', feedbackRoutes)

module.exports = app
