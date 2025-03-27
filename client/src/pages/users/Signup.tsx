import styled from 'styled-components';
import Button from '../../components/buttons/Button.tsx';
import { useForm } from 'react-hook-form';
import { ISignup } from '../../type/type.ts';
import Title from '../../components/Title.tsx';
import { emailValidation, nameValidation, passwordValidation } from '../../utils/validationRules.ts';
import useAuth from '../../hooks/useAuth.ts';
import FormInput from '../../components/forms/FormInput.tsx';

function Signup() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<ISignup>();
  const { handleSignup } = useAuth();

  const onSubmit = (data: ISignup) => {
    handleSignup(data, setError)
      .catch(() => {});
  };


  return (
    <>
      <Title bottomsize="40px">회원가입</Title>
      <SignupStyled onSubmit={ handleSubmit(onSubmit) }>
        {errors.root?.message && <p className='error-server'>{errors.root.message}</p>}
        <div className="input">
          <FormInput
            name="email"
            label="이메일"
            placeholder="이메일을 입력해 주세요."
            type="email"
            register={ register }
            validation={emailValidation}
            errors={ errors.email }
          />
          <FormInput
            name="name"
            label="이름"
            placeholder="이름를 입력해 주세요."
            type="text"
            register={ register }
            validation={ nameValidation }
            errors={ errors.name }
          />
          <FormInput
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요."
            type="password"
            register={ register }
            validation={ passwordValidation }
            errors={ errors.password }
          />
        </div>
        <div className="btn">
          <Button buttontype="filled" type="submit">회원가입</Button>
        </div>
      </SignupStyled>
    </>
  );
}

const SignupStyled = styled.form`
    width: 100%;

    .input {
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding-bottom: 60px;
    }

    .btn {
        width: 100%;
        text-align: center;
    }

    .error-server {
        text-align: center;
        color: #ec0000;
        margin-bottom: 20px;
        font-size: ${ ({ theme }) => theme.fontSize.text };

        font-weight: 600;
    }
`;

export default Signup;