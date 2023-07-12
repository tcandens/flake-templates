import z from 'zod'

export const TaskSchema = z.object({
  id: z.string(),
  name: z.string()
})

export const TaskInputSchema = TaskSchema.omit({
  id: true,
})

export const TaskOutputSchema = TaskSchema.pick({
  id: true,
})

export const TaskSelectSchema = TaskSchema.pick({
  id: true,
})

export type Task = z.infer<typeof TaskSchema>
export type TaskInput = z.infer<typeof TaskInputSchema>
export type TaskOutput = z.infer<typeof TaskOutputSchema>
export type TaskSelect = z.infer<typeof TaskSelectSchema>
