import { RegisterOptions } from 'react-hook-form';

export const emailValidation: RegisterOptions = {
  required: '이메일을 입력해 주세요.',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "올바른 이메일 형식을 입력해 주세요."
  }
};

export const passwordValidation: RegisterOptions = {
  required: '비밀번호를 입력해 주세요.',
  minLength: {
    value: 6,
    message: "6자 이상 입력해 주세요."
  },
}

export const passwordConfirmValidation = (password: string): RegisterOptions => ({
  required: '비밀번호를 다시 입력해 주세요.',
  validate: value =>
    value === password || '비밀번호가 일치하지 않습니다.'
})

export const nameValidation: RegisterOptions = {
  required: '이름을 입력해 주세요.',
}