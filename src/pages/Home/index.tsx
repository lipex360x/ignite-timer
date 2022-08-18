import create from 'zustand'
import { TaskForm } from '@/components/organisms/TaskForm'
import * as zod from 'zod'

import { HandPalm, Play } from 'phosphor-react'
import * as S from './styles'

import { TimerCountdown } from '@/components/molecules/TimerCountdown'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type CycleProps = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

type CyclesContextProps = {
  activeCycle: CycleProps | null
  activeCycleId: string | null
  amountSecondsPassed: number
  cycles: CycleProps[] | []
  setCycles: (cycle: CycleProps) => void
  setActiveCycle: (cycleId: string) => void
  finishCycle: () => void
  interruptCycle: () => void
  setAmountSecondsPassed: (value: number) => void
}

export const useCycleContext = create<CyclesContextProps>((set) => ({
  activeCycle: null,
  activeCycleId: null,
  amountSecondsPassed: 0,
  cycles: [],

  setActiveCycle: (cycleId) =>
    set(({ cycles }) => ({
      activeCycle: cycles.find((cycle) => cycle.id === cycleId),
      activeCycleId: cycleId,
    })),

  setAmountSecondsPassed: (value) =>
    set(() => ({ amountSecondsPassed: value })),

  setCycles: (cycle) => set((state) => ({ cycles: [...state.cycles, cycle] })),

  finishCycle: () =>
    set(({ cycles, activeCycleId }) => {
      document.title = 'Pomo finished'
      return {
        cycles: cycles.map((cycle) => {
          if (cycle.id === activeCycleId) cycle.finishedDate = new Date()
          return cycle
        }),
        activeCycle: null,
        activeCycleId: null,
      }
    }),

  interruptCycle: () =>
    set(({ cycles, activeCycleId }) => {
      document.title = 'Pomo interrupted'
      return {
        cycles: cycles.map((cycle) => {
          if (cycle.id === activeCycleId) cycle.interruptedDate = new Date()
          return cycle
        }),
        activeCycle: null,
        activeCycleId: null,
      }
    }),
}))

const formValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O Ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormProps = zod.infer<typeof formValidationSchema>

export function Home() {
  const {
    activeCycle,
    setCycles,
    setActiveCycle,
    setAmountSecondsPassed,
    interruptCycle,
  } = useCycleContext()

  const newCycleForm = useForm<NewCycleFormProps>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = newCycleForm

  const id = String(new Date().getTime())

  const handleCreateNewCycle = ({ task, minutesAmount }: NewCycleFormProps) => {
    const newCycle: CycleProps = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    setCycles(newCycle)
    setActiveCycle(id)
    setAmountSecondsPassed(0)

    reset()
  }

  const handleInterruptCycle = () => interruptCycle()

  if (Object.keys(errors).length) console.log(errors)

  const task = watch('task')
  const isFormDisabled = !task

  return (
    <S.WrapperForm onSubmit={handleSubmit(handleCreateNewCycle)}>
      <FormProvider {...newCycleForm}>
        <TaskForm />
      </FormProvider>

      <TimerCountdown />
      {activeCycle ? (
        <S.TimerStopButton onClick={handleInterruptCycle} type="button">
          <HandPalm size={24} /> Interromper
        </S.TimerStopButton>
      ) : (
        <S.TimerStartButton type="submit" disabled={isFormDisabled}>
          <Play size={24} /> Começar
        </S.TimerStartButton>
      )}
    </S.WrapperForm>
  )
}
