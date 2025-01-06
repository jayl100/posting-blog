import styled from 'styled-components';
import Button from '../../components/buttons/Button.tsx';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../../components/Title.tsx';
import { ILogin } from '../../type/type.ts';
import useAuth from '../../hooks/useAuth.ts';
import { emailValidation, passwordValidation } from '../../utils/validationRules.ts';
import FormInput from '../../components/forms/FormInput.tsx';


function LoginPage() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<ILogin>({
    criteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldFocusError: true,

  });
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: ILogin) => {
    handleLogin(data, setError)
      .catch(() => {});
  };

  const toSignup = () => {
    navigate('/users/signup')
  }

  return (
    <>
      <Title bottomsize="40px">로그인</Title>
      <LoginStyled onSubmit={ handleSubmit(onSubmit) }>
        { errors.root?.message && <p className="error-server">{ errors.root.message }</p> }
        <div className="input">
          <FormInput
            name="email"
            label="이메일"
            placeholder="이메일을 입력해 주세요."
            type="email"
            register={ register }
            validation={ emailValidation }
            errors={ errors.email }
          />

          <div className="password">
            <FormInput
              name="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요."
              type="password"
              register={ register }
              validation={ passwordValidation }
              errors={ errors.password }
            />
            <Link to="/users/reset">비밀번호 재설정</Link>
          </div>
        </div>
        <div className="btn">
          <Button buttontype="outlined" type="button" onClick={ toSignup }> 회원가입</Button>
          <Button buttontype="filled" type="submit"> 로그인</Button>
        </div>
      </LoginStyled>
    </>
  );
}

const LoginStyled = styled.form`
    width: 100%;

    .input {
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding-bottom: 60px;

        .password {
            display: flex;
            flex-direction: column;
            gap: 12px;

            a {
                text-align: right;
                text-decoration-line: underline;

                &:hover {
                    color: ${ ({ theme }) => theme.color.primary };
                }
            }
        }
    }

    .btn {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 22px;
    }

    .error-server {
        text-align: center;
        color: #ec0000;
        margin-bottom: 20px;
        font-size: ${ ({ theme }) => theme.fontSize.text };
    }
`;

export default LoginPage;