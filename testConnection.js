require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.MONGO_URI

if (!uri) {
  console.error('MONGO_URI não encontrada. Verifique o arquivo .env.')
  process.exit(1)
}

mongoose
  .connect(uri)
  .then(() => {
    console.log('🔥 MongoDB conectado com sucesso!')
    process.exit(0)
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message)
    process.exit(1)
  })
