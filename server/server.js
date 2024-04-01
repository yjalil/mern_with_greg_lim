import express from 'express'
import cors from 'cors'
import movies from './api/routes/movies.route.js'

const app = express()

app.use(cors())
app.use(express.json())

// movies routes
app.use("/api/v1/movies",movies)

// 404 for any other url
app.use('*',(req,res) => {
  res.status(404).json({error:"not found"})
})

export default app
