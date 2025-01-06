import requestHandler from './http';
import { ILogin, ISignup } from '../type/type.ts';


export const loginApi = async (data: ILogin) => {
  const response = await requestHandler('post', `/users/login`, data);
  return response;
};

export const signupApi = async (data: ISignup) => {
    const response = await requestHandler('post', `/users/signup`, data);
    return response;
};

export const resetPWApi = async (data: ILogin) => {
  const response = await requestHandler('put', `/users/reset`, data);
  return response;
}