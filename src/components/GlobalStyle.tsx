import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    color: #ffffff;
    background-color: ${(props) => props.theme.colors.background};
    font-family: ${(props) => props.theme.fonts.primary};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  .MuiOutlinedInput-root fieldset {
    border-radius: 20px;
    border: 2px solid ${(props) => props.theme.colors.foreground};

    &:focus {
      outline: 0;
      border: 2px solid ${(props) => props.theme.colors.primary};
    }
  }

  .MuiOutlinedInput-root input {
    padding: 10px 15px !important;
    color: ${(props) => props.theme.colors.foreground};

    font-size: 20px;
    font-weight: normal;
    font-family: ${(props) => props.theme.fonts.primary};

    &:disabled {
      opacity: 0.4;
    }
  }

  .Toastify__toast {
    border-radius: 20px;
    background-color: ${(props) => props.theme.colors.danger};
  }

  .Toastify__close-button {
    margin auto 5px auto 0;
  }
`;

export default GlobalStyle;
