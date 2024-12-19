import { useEffect, useState } from 'react';
import { postDetailApi } from '../api/posts.api.ts';
import { IPost } from '../type/type.ts';

const usePost = (postId?: number) => {
  const [ isPostInfo, setIsPostInfo ] = useState<IPost | null>(null);

  useEffect(() => {
    if (!postId) {
      // alert(`usePost, 게시글이 없습니다.${postId}` );
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await postDetailApi(postId);
        setIsPostInfo(res);
        // res: IPost

      } catch (err: any) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        } else {
          alert('알 수 없는 오류');
        }
        throw err;
      }
    };
    fetchPost();
  }, [ postId ]);


  return {
    isPostInfo,
  };
};


export default usePost;