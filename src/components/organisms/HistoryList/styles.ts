import styled, { css } from 'styled-components'

export const Wrapper = styled.main`
  ${({ theme }) => css`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 3.5rem;
  `}
`

export const HistoryContainer = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;
`

export const TableHistory = styled.table`
  ${({ theme }) => css`
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background: ${theme.color['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${theme.color['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background: ${theme.color['gray-700']};
      border-top: 4px solid ${theme.color['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        padding-left: 1.5rem;
        width: 50%;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  `}
`
