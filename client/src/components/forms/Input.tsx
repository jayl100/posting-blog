import styled from 'styled-components';
import React, { forwardRef } from 'react';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}


const Input = forwardRef<HTMLInputElement, Props>(({ label, placeholder, type, ...rest }, ref) => (

  <InputStyled>
    <label>{ label }</label>
    <input placeholder={ placeholder } type={ type } ref={ref} {...rest} />
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
`;

export default Input;