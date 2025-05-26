const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI
    if (!mongoURI) {
      throw new Error('❌ MONGO_URI não encontrada! Verifique o arquivo .env')
    }

    await mongoose.connect(mongoURI)

    console.log('🔥 MongoDB conectado!')
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB
