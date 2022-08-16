import styled, { css } from 'styled-components'

export const Wrapper = styled.form`
  max-width: 40rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
`

export const FormContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${theme.color['gray-100']};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
  `}
`

export const TimerContainer = styled.div`
  ${({ theme }) => css`
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${theme.color['gray-100']};
    display: flex;
    gap: 1rem;

    span {
      background: ${theme.color['gray-700']};
      padding: 2rem 1rem;
      border-radius: 8px;
    }
  `}
`

export const Separator = styled.div`
  ${({ theme }) => css`
    padding: 2rem 0;
    color: ${theme.color['green-500']};
    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
  `}
`

const BaseInput = styled.input`
  ${({ theme }) => css`
    padding: 0 0.5rem;
    height: 2.5rem;
    color: ${theme.color['gray-100']};
    background: transparent;
    border: 0;
    border-bottom: 2px solid ${theme.color['gray-500']};
    font-weight: bold;
    font-size: 1.125rem;

    &::placeholder {
      color: ${theme.color['gray-500']};
    }

    &:focus {
      box-shadow: none;
      border-color: ${theme.color['green-500']};
    }
  `}
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const TimerButton = styled.button`
  ${({ theme }) => css`
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: bold;

    background: ${theme.color['green-500']};
    color: ${theme.color['gray-100']};
    transition: background 100ms ease-in-out;

    &:not(:disabled):hover {
      background: ${theme.color['green-700']};
    }
  `}
`
