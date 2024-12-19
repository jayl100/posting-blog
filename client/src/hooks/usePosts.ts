import { useCallback, useState } from 'react';
import { fetchPostsApi, postingApi } from '../api/posts.api.ts';
import { IPosting, IPostList, IMeta } from '../type/type.ts';

const usePosts = () => {
  const [ isPosting, setIsPosting ] = useState('');
  const [ isPosts, setIsPosts ] = useState<IPostList[]>([]);
  const [ isMeta, setIsMeta ] = useState<IMeta>({
    totalPages: 0,
    totalItems: 0,
    currentPage: 1,
  });

  const fetchPosts = useCallback(async (page: number, limit: number = 8) => {
    try {
      const res = await fetchPostsApi(page, limit);
      setIsPosts(res.data);
      setIsMeta(res.meta);
      console.log('asdfasdf',res.meta)

    } catch (err: any) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert('알 수 없는 오류');
      }
      throw err;
    }

  }, [])

  const handlePosting = (data: IPosting) => {
    postingApi(data).then((res) => {
      setIsPosting(res);

    }).catch((err: any) => {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert('알 수 없는 오류');
      }
      throw err;
    });
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