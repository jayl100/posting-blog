import requestHandler from './http.ts';
import { IChangePassword, IDeleteUser, ILogin, IPostList, IUser } from '../type/type.ts';

export const userInfoApi = async () => {
  const response = await requestHandler<IUser>('get', `/mypage`);
  return response.data;
}

export const userPostApi = async () => {
  const response = await requestHandler<IPostList[]>('get', `/mypage/posts`);
  return response.data;
}

export const userChangePWApi = async (data: IChangePassword) => {
  const response = await requestHandler<IChangePassword>('put', `/mypage/password`, data);
  return response.data;
}

export const userDeleteApi = async (data: IDeleteUser) => {
  const response = await requestHandler<IDeleteUser>('post', `/mypage`, data);
  return response.data;
}