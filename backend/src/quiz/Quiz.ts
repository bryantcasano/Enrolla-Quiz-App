import type { Answer, GradeResponse, Question } from './types'

export class Quiz {
  private questions: Question[]

  constructor(questions: Question[]) {
    this.questions = questions
  }

  public getQuestions(): Question[] {
    return this.questions.map(({ correctIndex, correctIndexes, correctText, ...rest }) => rest)
  }

  public grade(answers: Answer[]): GradeResponse {
    let score = 0

    const results = this.questions.map((q) => {
      const answer = answers.find((a) => a.id === q.id)
      if (!answer) return { id: q.id, correct: false }

      let correct = false

      if (q.type === 'radio') {
        correct = q.correctIndex === answer.value
      } else if (q.type === 'checkbox') {
        if (Array.isArray(answer.value) && Array.isArray(q.correctIndexes)) {
          const sortedA = [...answer.value].sort((a, b) => a - b)
          const sortedC = [...q.correctIndexes].sort((a, b) => a - b)
          correct = JSON.stringify(sortedA) === JSON.stringify(sortedC)
        }
      } else if (q.type === 'text') {
        if (typeof answer.value === 'string' && typeof q.correctText === 'string') {
          correct = q.correctText.toLowerCase().trim() === answer.value.toLowerCase().trim()
        }
      }

      if (correct) score++
      return { id: q.id, correct }
    })

    return { score, total: this.questions.length, results }
  }
}
