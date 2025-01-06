import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { IChangePassword } from '../../type/type.ts';
import Button from '../buttons/Button.tsx';
import useMypage from '../../hooks/useMypage.ts';
import { passwordConfirmValidation, passwordValidation } from '../../utils/validationRules.ts';
import FormInput from '../forms/FormInput.tsx';

function MyChangePassword() {
  const { register, handleSubmit, setError, watch, formState: { errors } } = useForm<IChangePassword>();
  const { handleChangePW } = useMypage();
  const newPassword = watch('newPassword');

  const onSubmit = async (data: IChangePassword) => {
    await handleChangePW(data, setError);
  }

  return (
    <MyChangePasswordStyled>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="input">
          <FormInput
            name="oldPassword"
            label="현재 비밀번호"
            placeholder="현재 비밀번호를 입력해 주세요."
            type="password"
            register={ register }
            validation={ passwordValidation }
            errors={ errors.oldPassword }
          />
          <FormInput
            name="newPassword"
            label="새로운 비밀번호"
            placeholder="새로운 비밀번호를 입력해 주세요."
            type="password"
            register={ register }
            validation={ passwordValidation }
            errors={ errors.newPassword }
          />
          <FormInput
            name="newPasswordCheck"
            label="새로운 비밀번호 확인"
            placeholder="새로운 비밀번호를 다시 입력해 주세요."
            type="password"
            register={ register }
            validation={ passwordConfirmValidation(newPassword) }
            errors={ errors.newPasswordCheck }
          />
          <div className="error-btn">
            { errors.root?.message && <p className="error-server">{ errors.root.message }</p> }
            <Button buttontype="filled" type="submit">변경하기</Button>
          </div>
        </div>
      </form>
    </MyChangePasswordStyled>
  );
}

const MyChangePasswordStyled = styled.div`
    width: 100vw;
    background-color: ${ ({ theme }) => theme.color.f9 };
    margin-bottom: -100px;

    .error-btn {
        text-align: center;
        .error-server {
            margin-bottom: 20px;
            color: #ec0000;
            font-size: ${ ({ theme }) => theme.fontSize.text };
        }
    }

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

`;

export default MyChangePassword;