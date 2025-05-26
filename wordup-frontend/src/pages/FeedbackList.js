// src/pages/FeedbackList.js
import React, { useEffect, useState } from 'react'
import { getFeedbacks } from '../services/api'
import { Container, Typography, Grid, Card, CardContent } from '@mui/material'

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    getFeedbacks()
      .then(data => setFeedbacks(data))
      .catch(err => console.error('Erro ao buscar feedbacks:', err))
  }, [])

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Feedbacks
      </Typography>
      <Grid container spacing={2}>
        {feedbacks.map(feedback => (
          <Grid item xs={12} sm={6} md={4} key={feedback._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{feedback.content}</Typography>
                <Typography variant="body2">
                  Status: {feedback.status}
                </Typography>
                <Typography variant="body2">
                  Prazo: {new Date(feedback.deadline).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default FeedbackList
