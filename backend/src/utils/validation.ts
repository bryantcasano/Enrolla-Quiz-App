import { z } from 'zod'

export const GradeSchema = z.object({
  answers: z.array(
    z.object({
      id: z.string(),
      value: z.union([z.string(), z.number(), z.array(z.number())]),
    })
  ),
})
