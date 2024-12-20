import styled from 'styled-components';
import Input from '../forms/Input.tsx';
import Button from '../buttons/Button.tsx';
import { useForm } from 'react-hook-form';
import { ILogin } from '../../type/type.ts';

function MyWithdraw() {
  const {register, handleSubmit} = useForm<ILogin>()

  const onSubmit = (data: ILogin) => {
    alert('hello')
    return;
  }

  return (
    <MyWithdrawStyled>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="input">
          <Input label="비밀번호 확인" placeholder="비밀번호를 입력해 주세요." type="password"
                 { ...register('password', { required: '비밀번호를 입력해 주세요.' }) }
          />
          <Button buttontype="filled" type="submit">탈퇴하기</Button>
        </div>
      </form>
    </MyWithdrawStyled>
  );
}

const MyWithdrawStyled = styled.div`
    width: 100vw;
    background-color: ${ ({ theme }) => theme.color.f9 };
    margin-bottom: -100px;

    form {
        padding: 60px 0;
    }

    .input {
        display: flex;
        flex-direction: column;
        gap: 40px;
        justify-content: center;
        align-items: center;
    }

    .btn {
        width: 100%;
        text-align: center;
    }
`;

export default MyWithdraw;