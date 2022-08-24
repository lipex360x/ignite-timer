import { useFormContext } from 'react-hook-form'
import { useCycleContext } from '@/contexts/CycleContext'
import * as S from './styles'

export const TaskForm = () => {
  const { activeCycle } = useCycleContext()
  const { register } = useFormContext()

  return (
    <S.FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <S.TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        step={1}
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </S.FormContainer>
  )
}
