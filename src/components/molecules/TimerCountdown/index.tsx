import { useCycleContext, useGetStorage } from '@/contexts/CycleContext'
import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import * as S from './styles'

export const TimerCountdown = () => {
  const {
    activeCycleId,
    finishCycle,
    amountSecondsPassed,
    setAmountSecondsPassed,
  } = useCycleContext()

  const storageCycles = useGetStorage()

  const activeCycle = !!storageCycles && storageCycles.activeCycle

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) document.title = `Pomo: ${minutes}:${seconds}`
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: any

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          finishCycle()
          setAmountSecondsPassed()
          clearInterval(interval)
        } else {
          setAmountSecondsPassed()
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    finishCycle,
    setAmountSecondsPassed,
  ])

  return (
    <S.TimerContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.Separator>:</S.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </S.TimerContainer>
  )
}
