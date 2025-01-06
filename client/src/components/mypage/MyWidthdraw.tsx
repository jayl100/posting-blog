import styled from 'styled-components';
import Button from '../buttons/Button.tsx';
import { useForm } from 'react-hook-form';
import { IDeleteUser, ILogin, IUser } from '../../type/type.ts';
import FormInput from '../forms/FormInput.tsx';
import { passwordValidation } from '../../utils/validationRules.ts';
import useMypage from '../../hooks/useMypage.ts';

function MyWithdraw() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<IDeleteUser>()
  const { handleDeleteUser } = useMypage();

  const onSubmit = (data: IDeleteUser) => {
    handleDeleteUser(data, setError)
      .catch(() => {});
  }

  return (
      <MyWithdrawStyled onSubmit={ handleSubmit(onSubmit) }>
          <FormInput
            name="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 입력해 주세요."
            type="password"
            register={ register }
            validation={ passwordValidation }
            errors={ errors.password }
          />
          <div className="error-btn">
            { errors.root?.message && <p className="error-server">{ errors.root.message }</p> }
            <Button buttontype="filled" type="submit">탈퇴하기</Button>
          </div>
      </MyWithdrawStyled>
  );
}

const MyWithdrawStyled = styled.form`
    width: 100vw;
    background-color: ${ ({ theme }) => theme.color.f9 };
    margin-bottom: -100px;
    padding: 60px 0;
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    align-items: center;

    .error-btn {
        text-align: center;

        .error-server {
            margin-bottom: 20px;
            color: #ec0000;
            font-size: ${ ({ theme }) => theme.fontSize.text };
        }
    }
`;

export default MyWithdraw;