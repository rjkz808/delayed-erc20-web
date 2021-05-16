import styled from 'styled-components';

export interface BadgeProps {
  variant: 'primary' | 'success' | 'info';
}

const Badge = styled.div<BadgeProps>`
  width: fit-content;
  border-radius: 20px;
  padding: 10px 15px;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors[props.variant]};
  user-select: none;

  font-size: 22px;
  font-family: ${(props) => props.theme.fonts.mono};
  font-weight: 700;
  text-transform: uppercase;
`;

export default Badge;
