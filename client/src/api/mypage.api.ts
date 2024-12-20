import requestHandler from './http.ts';
import { IPostList, IUser } from '../type/type.ts';

export const userInfoApi = async () => {
  const response = await requestHandler<IUser>('get', `/mypage`);
  return response.data;
}

export const userPostApi = async () => {
  const response = await requestHandler<IPostList[]>('get', `/mypage/posts`);
  return response.data;
}