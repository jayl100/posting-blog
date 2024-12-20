import styled from 'styled-components';
import theme from '../../theme/theme.ts';
import { useForm } from 'react-hook-form';
import {IChangePassword } from '../../type/type.ts';
import Input from '../forms/Input.tsx';
import Button from '../buttons/Button.tsx';
import { userChangePsApi } from '../../api/mypage.api.ts';
import useMypage from '../../hooks/useMypage.ts';

function MyChangePassword() {
  const { register, handleSubmit } = useForm<IChangePassword>();
  const {changePW, handleChangePW} = useMypage();

  const onSubmit = (data: IChangePassword) => {
    handleChangePW(data);
  }

  return (
    <MyChangePasswordStyled>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="input">
          <Input label="현재 비밀번호" placeholder="현재 비밀번호를 입력해 주세요." type="password"
                 { ...register('oldPassword', { required: '현재 비밀번호를 입력해 주세요.' }) }
          />
          <Input label="새로운 비밀번호" placeholder="비밀번호를 6자 이상 입력해 주세요." type="password" minLength={6}
                 { ...register('newPassword', { required: '비밀번호를 6자 이상 입력해 주세요.' }) }
          />
          <Input label="새로운 비밀번호 확인" placeholder="다시 한번 입력해 주세요." type="password" minLength={6}
                 { ...register('newPasswordCheck', { required: '새로운 비밀번호를 입력해 주세요.' }) }
          />
          <Button buttontype="filled" type="submit">변경하기</Button>
        </div>
      </form>
    </MyChangePasswordStyled>
  );
}

const MyChangePasswordStyled = styled.div`
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

export default MyChangePassword;