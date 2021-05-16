import styled from 'styled-components';

export interface ButtonProps {
  small?: boolean;
}

const Button = styled.button<ButtonProps>`
  box-sizing: border-box;
  width: fit-content;
  padding: ${(props) => (props.small ? '3px 13px' : '7px 17px')};
  border-radius: 20px;
  user-select: none;

  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.primary};
  border: 3px solid ${(props) => props.theme.colors.primary};
  transition: all 0.2s ease;

  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 18px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
    background-color: transparent;
  }

  &:disabled,
  &:disabled:hover {
    cursor: default;
    background-color: ${(props) => props.theme.colors.disabled};
    border: 3px solid ${(props) => props.theme.colors.disabled};
    color: ${(props) => props.theme.colors.background};
  }
`;

export default Button;
