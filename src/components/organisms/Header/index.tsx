import * as S from './styles'

import { Logo } from '@/components/atoms/Logo'
import { Navigation } from '@/components/molecules/Navigation'

export const Header = () => {
  return (
    <S.Wrapper>
      <Logo />
      <Navigation />
    </S.Wrapper>
  )
}
