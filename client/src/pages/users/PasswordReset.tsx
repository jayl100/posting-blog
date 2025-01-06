import styled from 'styled-components';
import Button from '../../components/buttons/Button.tsx';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../../components/Title.tsx';
import { ILogin, IResetPassword } from '../../type/type.ts';
import useAuth from '../../hooks/useAuth.ts';
import { emailValidation, passwordConfirmValidation, passwordValidation } from '../../utils/validationRules.ts';
import FormInput from '../../components/forms/FormInput.tsx';
import { resetPWApi } from '../../api/auth.api.ts';
import MyWithdraw from '../../components/mypage/MyWidthdraw.tsx';


function PasswordReset() {
  const {handleResetPW} = useAuth();
  const { register, handleSubmit, setError, watch, formState: { errors } } = useForm<IResetPassword>({
    criteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
  });
  const passwordCheck = watch('password')

  const onSubmit = async (data: IResetPassword) => {
    await handleResetPW(data, setError);
  };

  return (
    <>
      <Title bottomsize="40px">비밀번호 재설정</Title>
      <PasswordResetStyled onSubmit={ handleSubmit(onSubmit) }>
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

            <FormInput
              name="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요."
              type="password"
              register={ register }
              validation={ passwordValidation }
              errors={ errors.password }
            />
            <FormInput
              name="passwordCheck"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해 주세요."
              type="password"
              register={ register }
              validation={ passwordConfirmValidation(passwordCheck) }
              errors={ errors.passwordCheck }
            />
        </div>
        <div className="btn">
          <Button buttontype="filled" type="submit">재설정</Button>
        </div>
      </PasswordResetStyled>
    </>
  );
}

const PasswordResetStyled = styled.form`
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

export default PasswordReset;
