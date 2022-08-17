import { Heading } from '@/components/atoms/Heading'
import { StatusBadge } from '@/components/atoms/StatusBadge'
import * as S from './styles'

export const HistoryList = () => {
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
