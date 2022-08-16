import { Play } from 'phosphor-react'
import * as S from './styles'

export const TaskForm = () => {
  return (
    <S.Wrapper>
      <S.FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <S.TaskInput
          type="text"
          id="task"
          placeholder="Dê um nome para o seu projeto"
          list="task-sugestions"
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
        />

        <span>minutos.</span>
      </S.FormContainer>

      <S.TimerContainer>
        <span>0</span>
        <span>0</span>
        <S.Separator>:</S.Separator>
        <span>0</span>
        <span>0</span>
      </S.TimerContainer>

      <S.TimerButton disabled type="submit">
        <Play size={24} /> Começar
      </S.TimerButton>
    </S.Wrapper>
  )
}
