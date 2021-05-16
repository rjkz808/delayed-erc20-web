import { MoonLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Loading() {
  const theme = useTheme();
  return (
    <LoadingContainer>
      <MoonLoader color={theme.colors.primary} size={60} />
    </LoadingContainer>
  );
}
