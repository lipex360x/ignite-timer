import { Heading } from '@/components/atoms/Heading'
import { StatusBadge } from '@/components/atoms/StatusBadge'
import { useCycleContext } from '@/contexts/CycleContext'
import * as S from './styles'

export const HistoryList = () => {
  const { cycles } = useCycleContext()
  console.log(cycles)

  return (
    <S.Wrapper>
      <Heading>Meu Histórico</Heading>
      <pre>{JSON.stringify(cycles, null, 2)}</pre>
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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <StatusBadge type="finalizado" />
              </td>
            </tr>

            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <StatusBadge type="progresso" />
              </td>
            </tr>

            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <StatusBadge type="interrompido" />
              </td>
            </tr>

            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <StatusBadge type="interrompido" />
              </td>
            </tr>
          </tbody>
        </S.TableHistory>
      </S.HistoryContainer>
    </S.Wrapper>
  )
}
