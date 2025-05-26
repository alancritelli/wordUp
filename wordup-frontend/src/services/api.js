import axios from 'axios'

const API_URL = 'http://localhost:5000/api' // URL do backend

export const getStudents = async () => {
  const response = await axios.get(`${API_URL}/students`)
  return response.data
}

export const getFeedbacks = async () => {
  const response = await axios.get(`${API_URL}/feedbacks`)
  return response.data
}
