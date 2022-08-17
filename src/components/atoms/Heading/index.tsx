import { ReactNode } from 'react'
import * as S from './styles'

type HeadingProps = {
  children: ReactNode
}

export const Heading = ({ children }: HeadingProps) => {
  return <S.Wrapper>{children}</S.Wrapper>
}
