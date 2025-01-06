import { useState } from 'react';
import { postDelApi, postDetailApi } from '../api/posts.api.ts';
import { IPost } from '../type/type.ts';
import { useNavigate } from 'react-router-dom';

const usePost = () => {
  const [ isPostInfo, setIsPostInfo ] = useState<IPost | null>(null);
  const navigate = useNavigate();

  const fetchPost = async (postId?: number) => {
    if (!postId) return null;

    try {
      const res = await postDetailApi(postId);
      setIsPostInfo(res); // res: IPost

    } catch (err: any) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert('알 수 없는 오류');
      }
      throw err;
    }
  };

  const deletePost = async (postId: number) => {
    if (!postId) {
      alert('존재하지 않는 게시글 입니다.');
      navigate('/posts');
      return null;
    }

    try {
      await postDelApi(postId);
      alert('게시글이 성공적으로 삭제되었습니다.');
      history.back();

    } catch (err: any) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert('알 수 없는 오류');
      }
      throw err;
    }
  }


  return {
    isPostInfo,
    fetchPost,
    deletePost,
  };
};


export default usePost;