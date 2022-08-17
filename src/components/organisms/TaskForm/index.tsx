import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Play } from 'phosphor-react'
import * as S from './styles'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

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
  startDate: Date
}

export const TaskForm = () => {
  const [cycles, setCycles] = useState<CycleProps[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    let interval: any

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

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
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  if (Object.keys(errors).length) console.log(errors)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) document.title = `Pomo: ${minutes}:${seconds}`
  }, [minutes, seconds, activeCycle])

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
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <S.Separator>:</S.Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </S.TimerContainer>

      <S.TimerButton type="submit" disabled={isFormDisabled}>
        <Play size={24} /> Começar
      </S.TimerButton>
    </S.WrapperForm>
  )
}
