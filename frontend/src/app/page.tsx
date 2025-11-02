/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useCallback } from 'react'
import { shuffleArray } from './utils/shuffle'

type Question = {
  id: string
  type: 'text' | 'radio' | 'checkbox'
  question: string
  choices?: string[]
}

const QUESTIONS_PER_PAGE = 5
const QUIZ_DURATION = 180 // in seconds

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [result, setResult] = useState<any>(null)
  const [page, setPage] = useState(0)
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION)

  useEffect(() => {
    async function loadQuiz() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quiz`)
        const data = (await res.json()) as { questions: Question[] }
        const randomSeed = Math.floor(Math.random() * 10000)
        const shuffledQuestions = shuffleArray(data.questions, randomSeed).map((q) => {
          if (q.choices) {
            return { ...q, choices: shuffleArray(q.choices, randomSeed + parseInt(q.id)) }
          }
          return q
        })
        setQuestions(shuffledQuestions)
        setLoading(false)
      } catch {
        setError('Failed to load quiz')
      }
    }
    loadQuiz()
  }, [])

  const handleSubmit = useCallback(async () => {
    const payload = {
      answers: Object.entries(answers).map(([id, value]) => ({ id, value })),
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/grade`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    setResult(data)
  }, [answers])

  useEffect(() => {
    if (loading || result) return
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [handleSubmit, loading, result])

  const handleChange = (id: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  if (loading) return <p className="text-center mt-10">Loading quiz...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>
  if (result)
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-black">
        <h2 className="text-2xl font-bold mb-4">Results</h2>
        <p className="mb-4 text-lg font-medium">
          Score: {result.score}/{result.total}
        </p>
        <ul className="space-y-2">
          {result.results.map((r: any) => (
            <li
              key={r.id}
              className={`p-2 rounded ${r.correct ? 'bg-green-100' : 'bg-red-100'}`}
            >
              Question {r.id}: {r.correct ? '✅ Correct' : '❌ Incorrect'}
            </li>
          ))}
        </ul>
        <button
          onClick={() => location.reload()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retake Quiz
        </button>
      </div>
    )

  // paginate questions
  const start = page * QUESTIONS_PER_PAGE
  const end = start + QUESTIONS_PER_PAGE
  const currentQuestions = questions.slice(start, end)

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-6 text-black">
      <h1 className="text-3xl font-bold text-center mb-2 text-blue-700">Quiz Time!</h1>
      <p className="text-center text-gray-600 mb-6">Answer all questions before time runs out.</p>
      <hr className="border-gray-300 mb-4" />

      <div className="text-right font-bold text-md">
        Time Left: {Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, '0')}
        :{(timeLeft % 60).toString().padStart(2, '0')}
      </div>

      {currentQuestions.map((q) => (
        <div key={q.id}>
          <p className="font-semibold mb-2">{q.question}</p>
          {q.type === 'text' && (
            <input
              type="text"
              className="border p-2 w-full rounded"
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
          {q.type === 'radio' &&
            q.choices?.map((choice, i) => (
              <label key={i} className="block">
                <input
                  type="radio"
                  name={q.id}
                  value={i}
                  onChange={() => handleChange(q.id, i)}
                  className="mr-2"
                />
                {choice}
              </label>
            ))}
          {q.type === 'checkbox' &&
            q.choices?.map((choice, i) => (
              <label key={i} className="block">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const prev = answers[q.id] || []
                    handleChange(
                      q.id,
                      e.target.checked ? [...prev, i] : prev.filter((v: number) => v !== i)
                    )
                  }}
                  className="mr-2"
                />
                {choice}
              </label>
            ))}
        </div>
      ))}

      <div className="flex justify-between mt-4">
        {page > 0 && (
          <button
            onClick={() => setPage(page - 1)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Previous
          </button>
        )}
        {end < questions.length ? (
          <button
            onClick={() => setPage(page + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  )
}
