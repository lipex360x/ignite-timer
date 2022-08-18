import styled, { css } from 'styled-components'

export const WrapperForm = styled.form`
  max-width: 40rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
`
export const TimerButtonBase = styled.button`
  ${({ theme }) => css`
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: bold;
    color: ${theme.color['gray-100']};
    transition: background 100ms ease-in-out;
  `}
`

export const TimerStartButton = styled(TimerButtonBase)`
  ${({ theme }) => css`
    background: ${theme.color['green-500']};

    &:not(:disabled):hover {
      background: ${theme.color['green-700']};
    }
  `}
`

export const TimerStopButton = styled(TimerButtonBase)`
  ${({ theme }) => css`
    background: ${theme.color['red-500']};

    &:not(:disabled):hover {
      background: ${theme.color['red-700']};
    }
  `}
`
