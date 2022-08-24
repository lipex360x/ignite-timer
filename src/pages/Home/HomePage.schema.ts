import * as zod from 'zod'

const formValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O Ciclo precisa ser de no máximo 60 minutos'),
})

export { formValidationSchema }
export type NewCycleFormDto = zod.infer<typeof formValidationSchema>
