import { CycleDto } from '@/Dtos/HomePageDto'
import create from 'zustand'

type CyclesContextProps = {
  cycles: CycleDto[] | []
  activeCycle: CycleDto | null
  activeCycleId: string | null
  amountSecondsPassed: number
  setCycles: (cycle: CycleDto) => void
  setActiveCycle: (cycleId: string) => void
  setAmountSecondsPassed: (value: number) => void
  interruptCycle: () => void
  finishCycle: () => void
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
