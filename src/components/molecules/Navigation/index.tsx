import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import * as S from './styles'

export const Navigation = () => {
  return (
    <S.Wrapper>
      <NavLink to="/" title="Timer">
        <Timer size={24} />
      </NavLink>
      <NavLink to="/history" title="Histórico">
        <Scroll size={24} />
      </NavLink>
    </S.Wrapper>
  )
}
