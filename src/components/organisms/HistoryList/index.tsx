import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Heading } from '@/components/atoms/Heading'
import { StatusBadge } from '@/components/atoms/StatusBadge'
import { useGetStorage } from '@/contexts/CycleContext'
import * as S from './styles'

export const HistoryList = () => {
  const storageCycles = useGetStorage()
  const { cycles } = storageCycles || []

  return (
    <S.Wrapper>
      <Heading>Meu Histórico</Heading>
      <S.HistoryContainer>
        <S.TableHistory>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles &&
              cycles.map((cycle) => (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && <StatusBadge type="finalizado" />}
                    {cycle.interruptedDate && (
                      <StatusBadge type="interrompido" />
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <StatusBadge type="progresso" />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </S.TableHistory>
      </S.HistoryContainer>
    </S.Wrapper>
  )
}
