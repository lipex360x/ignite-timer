import { CycleDto } from '@/Dtos/HomePageDto'
import create from 'zustand'

type CyclesContextProps = {
  cycles: CycleDto[] | []
  activeCycle: CycleDto | null
  activeCycleId: string | null
  amountSecondsPassed: number
  setCycles: (newCycle: CycleDto) => void
  setAmountSecondsPassed: (seconds: number) => void
  interruptCycle: () => void
  finishCycle: () => void
}

export const useCycleContext = create<CyclesContextProps>((set) => ({
  activeCycle: null,
  activeCycleId: null,
  amountSecondsPassed: 0,
  cycles: [],

  setAmountSecondsPassed: (seconds) =>
    set(() => ({ amountSecondsPassed: seconds })),

  setCycles: (newCycle) =>
    set(({ cycles }) => ({
      cycles: [...cycles, newCycle],
      activeCycleId: newCycle.id,
      activeCycle: newCycle,
      amountSecondsPassed: 0,
    })),

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
