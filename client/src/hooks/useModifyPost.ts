import { postPutApi } from '../api/posts.api.ts';
import { useEffect, useState } from 'react';
import usePost from './usePost.ts';
import { IPost, IPostList } from '../type/type.ts';

interface IModifyPost {
  title: string | undefined;
  content: string | undefined;
}


const useModifyPost = (id: number) => {

  const { isPostInfo } = usePost(id);

  const [ isPutPost, setIsPutPost ] = useState<IModifyPost>({
    title: isPostInfo?.title,
    content: isPostInfo?.content,
  });


  if (!id) {
    alert(`usePost, 게시글이 없습니다.${ id }`);
    return;
  }

  const handlePutPost = async (data: IPost) => {
    try {
      if (!id) {return;}
      const res = await postPutApi(id, data);
      setIsPutPost(res.data);
      console.log('resalsdkj', res.data);
      return isPutPost;
    } catch (err: any) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert('알 수 없는 오류');
      }
      throw err;
    }
  };


  return {
    isPutPost,
    handlePutPost,
  };


};

export default useModifyPost;