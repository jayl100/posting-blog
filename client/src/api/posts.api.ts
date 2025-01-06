import requestHandler from './http';
import { IMeta, IPost, IPostList } from '../type/type.ts';

interface IPostsResponse {
  data: IPostList[],
  meta: IMeta,
}

export const fetchPostsApi = async (page: number, limit: number): Promise<IPostsResponse> => {
  const response = await requestHandler<IPostsResponse>('get', `/posts?page=${page}&limit=${limit}`);
  return response.data;
}

export const postingApi = async (data: IPost) => {
  const response = await requestHandler('post', `/posts/posting`, data);
  return response.data;
}

export const postDetailApi = async (postId: number) => {
  const response = await requestHandler<IPost>('get', `/posts/${postId}`);
  return response.data;
}

export const postPutApi = async (postId: number, data: IPost) => {
  const response = await requestHandler('put', `/posts/posting/${postId}`, data)
  return response.data;
}

export const postDelApi = async (postId: number) => {
  const response = await requestHandler('delete', `/posts/${postId}`)
  return response.data;
}