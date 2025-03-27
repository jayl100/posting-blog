import { useCallback, useState } from 'react';
import { fetchPostsApi, postingApi } from '../api/posts.api.ts';
import { IPosting, IPostList, IMeta } from '../type/type.ts';
import { useNavigate } from 'react-router-dom';

const usePosts = () => {
  const navigate = useNavigate();
  const [ isPosting, setIsPosting ] = useState('');
  const [ isPosts, setIsPosts ] = useState<IPostList[]>([]);
  const [ isMeta, setIsMeta ] = useState<IMeta>({
    totalPages: 0,
    totalItems: 0,
    currentPage: 1,
  });

  const fetchPosts = useCallback(async (page: number, limit: number = 10) => {
    try {
      const res = await fetchPostsApi(page, limit);
      setIsPosts(res.data);
      setIsMeta(res.meta);

    } catch (err: any) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert('알 수 없는 오류');
      }
      throw err;
    }

  }, [])

  const handlePosting = async (data: IPosting) => {
    try {
    const res = await postingApi(data);
      setIsPosting(res);
      alert('게시글 등록이 완료되었습니다.')
      navigate(`/posts/`);

    }
    catch(err: any) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert('알 수 없는 오류');
      }
      throw err;
    }
    return isPosting;
  };


  return {
    isPosts,
    setIsPosts,
    handlePosting,
    isMeta,
    fetchPosts,
  };
};

export default usePosts;