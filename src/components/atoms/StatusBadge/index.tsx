import * as S from './styles'

export const STATUS_COLOR = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

export const STATUS = {
  finalizado: {
    color: 'green-500',
    text: 'Concluído',
  },
  progresso: {
    color: 'yellow-500',
    text: 'Em andamento',
  },
  interrompido: {
    color: 'red-500',
    text: 'Interrompido',
  },
} as const

export type StatusBadgeProps = {
  type: keyof typeof STATUS
}

export const StatusBadge = ({ type }: StatusBadgeProps) => {
  return <S.Wrapper type={type}>{STATUS[type].text}</S.Wrapper>
}
