import create from 'zustand'
import { produce } from 'immer'
import { CycleDto } from '@/Dtos/HomePageDto'

export type CyclesContextProps = {
  cycles: CycleDto[] | []
  activeCycle: CycleDto | null
  activeCycleId: string | null
  amountSecondsPassed: number
  setCycles: (newCycle: CycleDto) => void
  setAmountSecondsPassed: (seconds: number) => void
  interruptCycle: () => void
  finishCycle: () => void
}

export const useCycleContext = create<CyclesContextProps>((set) => {
  return {
    activeCycle: null,
    activeCycleId: null,
    amountSecondsPassed: 0,
    cycles: [],

    setAmountSecondsPassed: (seconds) =>
      set(() => ({ amountSecondsPassed: seconds })),

    setCycles: (newCycle) =>
      set((state) => {
        return produce(state, (draft) => {
          draft.cycles = [...state.cycles, newCycle]
          draft.activeCycleId = newCycle.id
          draft.activeCycle = newCycle
          draft.amountSecondsPassed = 0

          const stateJSON = JSON.stringify(draft)
          localStorage.setItem('@ignite-pomodore:cycle-state-1.0.0', stateJSON)
        })
      }),

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

          const stateJSON = JSON.stringify(draft)
          localStorage.setItem('@ignite-pomodore:cycle-state-1.0.0', stateJSON)
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
          draft.amountSecondsPassed = 0

          const stateJSON = JSON.stringify(draft)

          localStorage.setItem('@ignite-pomodore:cycle-state-1.0.0', stateJSON)
        })
      }),
  }
})
