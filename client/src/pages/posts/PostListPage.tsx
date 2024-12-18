import styled from 'styled-components';
import Title from '../../components/Title.tsx';
import PostListDetail from '../../components/posts/PostListDetail.tsx';

function PostList() {
  return (
    <>
      <Title bottomsize="60px">게시판</Title>
      <PostListStyled>
        <PostListDetail />
        {/*페이지네이션 컴포넌트*/}
      </PostListStyled>
    </>
  );
}

const PostListStyled = styled.div`

`;

export default PostList;