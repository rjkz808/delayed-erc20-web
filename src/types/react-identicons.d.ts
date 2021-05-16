declare module 'react-identicons' {
  import { FunctionComponent } from 'react';

  const Identicon: FunctionComponent<{
    string: string;
    size?: number;
    padding?: number;
    bg?: string;
    fg?: string;
    palette?: string;
    count?: string;
    getColor?: (value: string) => string;
  }>;

  export default Identicon;
}
