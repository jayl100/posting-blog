import styled from 'styled-components';
import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  errors?: FieldError;
}

const Input = forwardRef<HTMLInputElement, IInputProps>
(({ label, errors, ...rest }, ref) =>
  (
  <InputStyled>
    {label && <label>{ label }</label> }
    <input
      className={errors ? 'error' : ''}
      ref={ ref }
      { ...rest }
    />
    {errors && <span className='error-span'>{errors.message}</span>}
  </InputStyled>

));


const InputStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 600px;

    label {
        font-size: ${ ({ theme }) => theme.fontSize.text };
        text-align: left;
    }

    input {
        width: 100%;
        height: 64px;
        border: 1px solid ${ ({ theme }) => theme.color.lightGrey };
        font-size: ${ ({ theme }) => theme.fontSize.text };
        padding-left: 20px;

        &::placeholder {
            color: ${ ({ theme }) => theme.color.lightGrey };
            font-size: ${ ({ theme }) => theme.fontSize.text };
        }

        &:focus {
            border: 2px solid ${ ({ theme }) => theme.color.secondary };
            outline: none;
        }
    }
    
    .error {
        border: 1px solid #ec0000;

        &:focus {
            border: 2px solid #ec0000;
            outline: none;
        }
    }
    
    .error-span {
        color: #ec0000;
    }
`;

export default Input;