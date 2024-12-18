import requestHandler from './http';
import { IMeta, IPost, IPosting, IPostList } from '../type/type.ts';

interface IPostsResponse {
  data: IPostList[],
  meta: IMeta,
}

export const fetchPostsApi = async (page: number, limit: number): Promise<IPostsResponse> => {
  const response = await requestHandler<IPostsResponse>('get', `/posts?page=${page}&limit=${limit}`);
  return response.data;
}

export const postingApi = async (data: IPosting) => {
  const response = await requestHandler('post', `/posts/posting`, data);
  return response.data;
}

export const postDetailApi = async (postId: string) => {
  const response = await requestHandler<IPost>('get', `/posts/${postId}`);
  return response.data;
}