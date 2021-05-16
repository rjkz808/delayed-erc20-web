import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      foreground: string;
      background: string;
      success: string;
      info: string;
      disabled: string;
      danger: string;
    };
    fonts: {
      primary: string;
      mono: string;
    };
  }
}

const theme: DefaultTheme = {
  colors: {
    primary: '#ffca28',
    background: '#212121',
    foreground: '#ffffff',
    success: '#9ccc65',
    info: '#42a5f5',
    disabled: '#9e9e9e',
    danger: '#ff5252',
  },
  fonts: {
    primary: '"Inter", sans-serif',
    mono: '"Roboto Mono", monospase',
  },
};

export default theme;
