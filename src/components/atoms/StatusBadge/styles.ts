import styled, { css, DefaultTheme } from 'styled-components'
import { STATUS, StatusBadgeProps } from '.'

type WrapperProps = Pick<StatusBadgeProps, 'type'>

const wrapperModifier = {
  status: (theme: DefaultTheme, type: keyof typeof STATUS) => css`
    background: ${theme.color[STATUS[type].color]};
  `,
}

export const Wrapper = styled.span<WrapperProps>`
  ${({ theme, type }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '';
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;

      ${type && wrapperModifier.status(theme, type)}
    }
  `}
`
