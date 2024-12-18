import styled from 'styled-components';
import Input from '../../components/forms/Input.tsx';
import Button from '../../components/buttons/Button.tsx';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../../components/Title.tsx';
import { ILogin } from '../../type/type.ts';
import useAuth from '../../hooks/useAuth.ts';


function LoginPage() {
  const { register, handleSubmit } = useForm<ILogin>();
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: ILogin) => {
    console.log(data);
    handleLogin(data)
  };

  const toSignup = () => {
    navigate('/users/signup')
  }

  return (
    <>
      <Title bottomsize="60px">로그인</Title>
      <LoginStyled onSubmit={ handleSubmit(onSubmit) }>
        <div className="input">
          <Input label="이메일" placeholder="아이디를 입력해 주세요." type="email"
                 { ...register('email', { required: '이메일을 입력해 주세요.' }) }
          />
          <div className="password">
            <Input label="비밀번호" placeholder="비밀번호를 입력해 주세요." type="password"
                   { ...register('password', { required: '비밀번호를 입력해 주세요.' }) }
            />
            <Link to="/users/reset">비밀번호 재설정</Link>
          </div>
        </div>
        <div className="btn">
          <Button buttontype="outlined" type="button" onClick={() => {toSignup()}}> 회원가입</Button>
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
`;

export default LoginPage;