import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ISignup } from '../../type/type.ts';


export interface Props {
  inputType: 'email' | 'name' | 'password';
}

function InputTypes({inputType}: Props){
  const { register, formState: { errors } } = useForm<ISignup>();

  return (
    <InputTypesStyled>
      {inputType === 'email' ? <EmailInputStyled>
        <label>이메일</label>
        <input
          placeholder="이메일을 입력해 주세요."
          type="text"
          className={ errors ? 'error' : '' }
          { ...register('email', {
            required: '이메일을 입력해 주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '올바른 이메일 형식을 입력해 주세요.',
            },
          }) }
        />
        { errors && <span className="error-span">{ errors.email?.message }</span> }
      </EmailInputStyled> : '' }
      {inputType === 'password' ? <PasswordInputStyled>
        <label>비밀번호</label>
        <input
          placeholder="비밀번호를 입력해 주세요."
          type="password"
          className={ errors ? 'error' : '' }
          { ...register('email', {
            required: '비밀번호를 입력해 주세요.',
            minLength: {
              value: 6,
              message: "6자 이상 입력해 주세요."
            },
          }) }
        />
        { errors && <span className="error-span">{ errors.password?.message }</span> }
      </PasswordInputStyled> : '' }
    </InputTypesStyled>
  )

}

const InputTypesStyled = styled.div`
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

const EmailInputStyled = styled.div`

`;

const PasswordInputStyled = styled.div`

`

export default InputTypes;