export type QuestionType = 'text' | 'radio' | 'checkbox'

export interface Question {
  id: string
  type: QuestionType
  question: string
  choices?: string[]
  correctIndex?: number
  correctIndexes?: number[]
  correctText?: string
}

export interface Answer {
  id: string
  value: string | number | number[]
}

export interface GradeResult {
  id: string
  correct: boolean
}

export interface GradeResponse {
  score: number
  total: number
  results: GradeResult[]
}
