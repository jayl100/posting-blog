import styled from 'styled-components';
import Title from '../../components/Title.tsx';
import PostsList from '../../components/posts/PostsList.tsx';
import Pagination from '../../components/posts/Pagination.tsx';
import usePosts from '../../hooks/usePosts.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PostListPage() {
  const navigate = useNavigate();
  const { isMeta, fetchPosts, isPosts } = usePosts();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    const limit = parseInt(params.get('limit') || '8', 10);
    fetchPosts(page, limit);
  }, [ location.search, fetchPosts ]);

  const handlePageChange = (page: number, limit: number = 8) => {
    navigate(`/posts?page=${ page }&limit=${ limit }`);
  }

  return (
    <>
      <Title bottomsize="60px">게시판</Title>
      <PostListStyled>
            <PostsList posts={ isPosts } total={ isMeta.totalItems } />
            <Pagination
              currentPage={ isMeta.currentPage } totalPages={ isMeta.totalPages }
              onPageChange={ (page) => {handlePageChange(page)} } />
      </PostListStyled>
    </>
  );
}

const PostListStyled = styled.div`
    width: 100%;

    .total {
        width: 100%;
        margin-bottom: 12px;
        color: ${ ({ theme }) => theme.color.secondary };
    }
`;

export default PostListPage;