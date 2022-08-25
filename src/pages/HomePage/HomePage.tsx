import { TaskForm } from '@/components/organisms/TaskForm'

import { HandPalm, Play } from 'phosphor-react'
import * as S from './styles'

import { TimerCountdown } from '@/components/molecules/TimerCountdown'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCycleContext, useGetStorage } from '@/contexts/CycleContext'
import { formValidationSchema, NewCycleFormDto } from './HomePage.schema'
import { CycleDto } from '@/Dtos/HomePageDto'

const HomePage = () => {
  const { setCycles, interruptCycle } = useCycleContext()

  const storageCycles = useGetStorage()

  const activeCycle = !!storageCycles && storageCycles.activeCycle

  const newCycleForm = useForm<NewCycleFormDto>({
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

  const handleCreateNewCycle = ({ task, minutesAmount }: NewCycleFormDto) => {
    const newCycle: CycleDto = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    setCycles(newCycle)
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

export default HomePage
