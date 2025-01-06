import React from 'react';
import Input, { IInputProps } from './Input.tsx';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface IFormInputProps extends Omit<IInputProps, 'errors' | 'name'>{
  name: string;
  register: UseFormRegister<any>;
  validation? : RegisterOptions;
  errors?: FieldError;
}

const FormInput: React.FC<IFormInputProps> = ({
  name, label, register, validation, errors, ...rest
}) => {
  return (
    <Input
      label={label}
      errors={errors}
      {...register(name, validation)}
      {...rest}
      />
  )
}

export default FormInput;