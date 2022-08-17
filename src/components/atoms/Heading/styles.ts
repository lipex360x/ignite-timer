import styled, { css } from 'styled-components'

export const Wrapper = styled.h1`
  ${({ theme }) => css`
    font-size: 1.5rem;
    color: ${theme.color['gray-100']};
  `}
`
