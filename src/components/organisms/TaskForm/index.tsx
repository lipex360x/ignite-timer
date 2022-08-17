import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Play } from 'phosphor-react'
import * as S from './styles'
import { useState } from 'react'

const formValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O Ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormProps = zod.infer<typeof formValidationSchema>

type CycleProps = {
  id: string
  task: string
  minutesAmount: number
}

export const TaskForm = () => {
  const [cycles, setCycles] = useState<CycleProps[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const id = String(new Date().getTime())

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewCycleFormProps>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const onSubmit = ({ task, minutesAmount }: NewCycleFormProps) => {
    const newCycle: CycleProps = {
      id,
      task,
      minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)

    reset()
  }

  if (Object.keys(errors).length) console.log(errors)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  console.log(activeCycle)

  const task = watch('task')
  const isFormDisabled = !task

  return (
    <S.WrapperForm onSubmit={handleSubmit(onSubmit)}>
      <S.FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <S.TaskInput
          type="text"
          id="task"
          placeholder="Dê um nome para o seu projeto"
          list="task-sugestions"
          {...register('task')}
        />

        <datalist id="task-sugestions">
          <option value="Projeto 1" />
        </datalist>

        <label htmlFor="minutesAmount">durante</label>
        <S.MinutesAmountInput
          type="number"
          id="minutesAmount"
          placeholder="00"
          step={5}
          min={5}
          max={60}
          {...register('minutesAmount', { valueAsNumber: true })}
        />

        <span>minutos.</span>
      </S.FormContainer>

      <S.TimerContainer>
        <span>0</span>
        <span>0</span>
        <S.Separator>:</S.Separator>
        <span>0</span>
        <span>0</span>
      </S.TimerContainer>

      <S.TimerButton type="submit" disabled={isFormDisabled}>
        <Play size={24} /> Começar
      </S.TimerButton>
    </S.WrapperForm>
  )
}
