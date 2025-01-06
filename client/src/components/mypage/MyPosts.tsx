import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { userPostApi } from '../../api/mypage.api.ts';
import { IPostList } from '../../type/type.ts';
import PostsList from '../posts/PostsList.tsx';

function MyPosts() {
  const [ userPosts, setUserPosts ] = useState<IPostList[]>([])

  useEffect(() => {
    userPostApi().then((res) => {
      setUserPosts(res);
    })
  }, []);

  return (
    <MyPostsStyled>
      <PostsList posts={userPosts} total={userPosts.length}/>
    </MyPostsStyled>
  );
}

const MyPostsStyled = styled.div`
    width: 100%;
`;

export default MyPosts;