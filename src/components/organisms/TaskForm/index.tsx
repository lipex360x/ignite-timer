import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Play } from 'phosphor-react'
import * as S from './styles'

const formValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O Ciclo precisa ser de no máximo 60 minutos'),
})

export const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(formValidationSchema),
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <S.WrapperForm onSubmit={handleSubmit(onSubmit)}>
      <S.FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <S.TaskInput
          type="text"
          id="task"
          placeholder="Dê um nome para o seu projeto"
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
          step={5}
          min={5}
          max={60}
          {...register('minutesAmount', { valueAsNumber: true })}
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

      <S.TimerButton type="submit" disabled={!isValid}>
        <Play size={24} /> Começar
      </S.TimerButton>
    </S.WrapperForm>
  )
}
