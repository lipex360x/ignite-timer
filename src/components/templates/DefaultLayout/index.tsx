import { Outlet } from 'react-router-dom'
import { Header } from '@/components/organisms/Header'
import * as S from './styles'

export const DefaultLayout = () => (
  <S.Container>
    <Header />
    <Outlet />
  </S.Container>
)
