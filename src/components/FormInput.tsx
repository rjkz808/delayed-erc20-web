import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

interface InputProps {
  error?: boolean;
}

interface LabelProps {
  error?: boolean;
}

const Input = styled.input<InputProps>`
  display: block;
  width: 100%;
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 20px;
  padding: 10px 15px;
  font-size: 20px;
  transition: all 0.2s ease;

  border: 2px solid
    ${(props) => {
      if (props.error) {
        return props.theme.colors.danger;
      }
      return props.theme.colors.foreground;
    }};

  color: ${(props) => props.theme.colors.foreground};

  &:focus {
    outline: 0;
    border: 2px solid
      ${(props) => {
        const { error, theme } = props;
        if (error) {
          return theme.colors.danger;
        }
        return theme.colors.primary;
      }};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.foreground};
    opacity: 0.4;
    font-size: 18px;
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &:disabled {
    opacity: 0.4;
  }
`;

export const FormInputLabel = styled.label<LabelProps>`
  width: 100%;
  margin-bottom: 10px;
  margin-left: 10px;

  color: ${(props) =>
    props.error ? props.theme.colors.danger : props.theme.colors.foreground};
`;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const hasError = !!props.error;
  return (
    <>
      {props.label && (
        <FormInputLabel htmlFor={props.name} error={hasError}>
          {props.label}
        </FormInputLabel>
      )}
      <Input {...props} ref={ref} error={hasError} />
    </>
  );
});

export default FormInput;
