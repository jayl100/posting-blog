import requestHandler from './http.ts';
import { IChangePassword, IPostList, IUser } from '../type/type.ts';

export const userInfoApi = async () => {
  const response = await requestHandler<IUser>('get', `/mypage`);
  return response.data;
}

export const userPostApi = async () => {
  const response = await requestHandler<IPostList[]>('get', `/mypage/posts`);
  return response.data;
}

export const userChangePsApi = async (data: IChangePassword) => {
  const response = await requestHandler<IChangePassword>('put', `/mypage/password`, data);
  return response.data;
}