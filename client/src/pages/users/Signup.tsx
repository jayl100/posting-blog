import styled from 'styled-components';
import Input from '../../components/forms/Input.tsx';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button.tsx';
import { useForm } from 'react-hook-form';
import { ISignup } from '../../type/type.ts';
import Title from '../../components/Title.tsx';
import { signupApi } from '../../api/auth.api.ts';


function Signup() {
  const { register, handleSubmit, } = useForm<ISignup>();
  const navigate = useNavigate();

  const onSubmit = (data: ISignup) => {
    signupApi(data).then((res) => {
      alert(`${data.name}님 ${res.data.message}`);
        navigate('/users/login');
      }
    ).catch((err) => {
      alert(err);
      console.log(err);
    })
  };


  return (
    <>
      <Title bottomsize="60px">회원가입</Title>
      <SignupStyled onSubmit={ handleSubmit(onSubmit) }>
        <div className="input">
          <Input label="이메일" placeholder="아이디를 입력해 주세요." type="email"
                 { ...register('email', { required: '이메일을 입력해 주세요.' }) }
          />
          <Input label="이름" placeholder="이름를 입력해 주세요." type="text"
                 { ...register('name', { required: '이름를 입력해 주세요.' }) }
          />
          <Input label="비밀번호" placeholder="비밀번호를 6자 이상 입력해 주세요." type="password" minLength={6}
                 { ...register('password', { required: '비밀번호를 6자 이상 입력해 주세요.' }) }
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
    width:100%;
    
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
`;

export default Signup;