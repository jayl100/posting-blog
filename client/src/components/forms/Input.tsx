import styled from 'styled-components';
import React, { forwardRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
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


    label {
        font-size: ${ ({ theme }) => theme.fontSize.text };
    }

    input {
        height: 64px;
        width: 600px;
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