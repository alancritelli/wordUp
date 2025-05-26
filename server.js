const express = require('express')
const connectDB = require('./src/config/db')

const app = express()
app.use(express.json())

connectDB() // Conectando ao banco

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`))
