import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';

const NotFoundContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundHeading = styled.h1`
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 72px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const NotFoundDescription = styled.h4`
  margin-bottom: 20px;
  font-size: 18px;
`;

export default function NotFound() {
  const history = useHistory();

  return (
    <NotFoundContainer>
      <NotFoundHeading>404</NotFoundHeading>
      <NotFoundDescription>
        Cannot find the page you are looking for.
      </NotFoundDescription>
      <Button onClick={() => history.push('/')}>Go to home page</Button>
    </NotFoundContainer>
  );
}
