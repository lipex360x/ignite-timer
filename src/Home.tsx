import create from 'zustand'

type ZustandStoreProps = {
  activeCycle: number
  setCycle: () => void
}

const useZustandStore = create<ZustandStoreProps>((set) => ({
  activeCycle: 0,
  setCycle: () => set((state) => ({ activeCycle: state.activeCycle + 1 })),
}))

function CycleForm() {
  const { activeCycle, setCycle } = useZustandStore()
  return (
    <div>
      <h1>CycleForm: {activeCycle}</h1>
      <button onClick={setCycle}>Alterar Ciclo ativo</button>
    </div>
  )
}

function Countdown() {
  const { activeCycle } = useZustandStore()

  return <h1>New Countdow: {activeCycle}</h1>
}

export function Home() {
  return (
    <div>
      <CycleForm />
      <Countdown />
    </div>
  )
}
