import { postPutApi } from '../api/posts.api.ts';
import { useState } from 'react';
import usePost from './usePost.ts';
import { IModifyPost, IPost} from '../type/type.ts';
import { useNavigate } from 'react-router-dom';

const useModifyPost = (id?: number) => {
  const navigate = useNavigate();
  const { isPostInfo } = usePost();
  const [ isPutPost, setIsPutPost ] = useState<IModifyPost>({
    title: isPostInfo?.title || '',
    content: isPostInfo?.content || '',
  });

  const handlePutPost = async (data: IPost) => {
    if (!id) {
      alert('존재하지 않는 게시글 입니다.');
      navigate('/posts');
      return null;
    }

    try {
      const res = await postPutApi(id, data);
      setIsPutPost(res);
      alert('게시글이 수정되었습니다..');
      navigate(`/posts/${ id }`);

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