import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator'
import { GradeSchema } from './utils/validation'
import { quizData } from './quiz/QuizData'
import { Quiz } from './quiz/Quiz'

const app = new Hono()
app.use('*', cors({ origin: '*', allowMethods: ['GET', 'POST', 'OPTIONS'] }))

// Mock Data for Questions
const quiz = new Quiz(quizData)

// Routes
app.get('/api/quiz', (c) => c.json({ questions: quiz.getQuestions() }))

app.post('/api/grade', zValidator('json', GradeSchema), (c) => {
  const { answers } = c.req.valid('json')
  const result = quiz.grade(answers)
  return c.json(result)
})

export default app
