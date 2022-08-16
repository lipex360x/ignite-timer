import { css, createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: antialiased;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  html, body {
    height: 100%;
  }

  button {
    cursor: pointer;
    border: 0;
    background: transparent;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed
  }

  ${({ theme }) => css`
    /* html {
      font-size: 62.5%;
    } */

    :focus {
      outline: 0;
      box-shadow: 0 0 0 2px ${theme.color['green-500']};
    }

    body {
      color: ${theme.color.white};
      background: ${theme.color['gray-900']};

      ::-webkit-scrollbar {
        display: none;
      }
    }

    body,
    input,
    textarea,
    button {
      font-family: ${theme.font.family};
    }
  `}
`
