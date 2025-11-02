import type { Question } from './types'

export const quizData: Question[] = [
  {
    id: '1',
    type: 'radio',
    question: 'What is the capital of France?',
    choices: ['Berlin', 'Paris', 'Rome', 'Madrid'],
    correctIndex: 1,
  },
  {
    id: '2',
    type: 'checkbox',
    question: 'Select all prime numbers:',
    choices: ['2', '4', '5', '9'],
    correctIndexes: [0, 2],
  },
  {
    id: '3',
    type: 'text',
    question: 'Framework used for this backend?',
    correctText: 'Hono',
  },
  {
    id: '4',
    type: 'radio',
    question: 'Which language runs in a web browser?',
    choices: ['Python', 'C++', 'JavaScript', 'Rust'],
    correctIndex: 2,
  },
  {
    id: '5',
    type: 'checkbox',
    question: 'Which of the following are JavaScript frameworks?',
    choices: ['React', 'Laravel', 'Vue', 'Django'],
    correctIndexes: [0, 2],
  },
  {
    id: '6',
    type: 'text',
    question: 'What does CSS stand for?',
    correctText: 'Cascading Style Sheets',
  },
  {
    id: '7',
    type: 'radio',
    question: 'Which planet is known as the Red Planet?',
    choices: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctIndex: 1,
  },
  {
    id: '8',
    type: 'checkbox',
    question: 'Select the programming languages (not markup):',
    choices: ['HTML', 'CSS', 'Python', 'JavaScript'],
    correctIndexes: [2, 3],
  },
  {
    id: '9',
    type: 'text',
    question: 'What is the command to initialize a new git repository?',
    correctText: 'git init',
  },
  {
    id: '10',
    type: 'radio',
    question: 'Which company developed the Next.js framework?',
    choices: ['Meta', 'Google', 'Vercel', 'Amazon'],
    correctIndex: 2,
  },
]
