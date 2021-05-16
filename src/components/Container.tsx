import styled from 'styled-components';

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 30px 20vw 0;
  background-color: ${(props) => props.theme.colors.background};
`;

export default Container;
