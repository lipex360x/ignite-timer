import create from 'zustand'
import { produce } from 'immer'
import { CycleDto } from '@/Dtos/HomePageDto'

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
    set((state) => {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) return state

      document.title = 'Pomo finished'
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
        draft.activeCycle = null
      })
    }),

  interruptCycle: () =>
    set((state) => {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) return state

      document.title = 'Pomo interrupted'
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
        draft.activeCycle = null
      })
    }),
}))
