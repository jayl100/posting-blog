import styled from 'styled-components';
import Title from '../../components/Title.tsx';
import PostsList from '../../components/posts/PostsList.tsx';
import Pagination from '../../components/posts/Pagination.tsx';
import usePosts from '../../hooks/usePosts.ts';
import { useEffect } from 'react';

function PostListPage() {
  const { isMeta, fetchPosts, isPosts } = usePosts();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    const limit = parseInt(params.get('limit') || '8', 10);
    fetchPosts(page, limit);
  }, [location.search, fetchPosts]);

  const handlePageChange = (page: number, limit: number = 8) => {
    console.log(`페이지 변경: ${page}`);
    location.href = (`/posts?page=${page}&limit=${limit}`);
  }

  return (
    <>
      <Title bottomsize="60px">게시판</Title>
      <PostListStyled>
        <PostsList posts={isPosts} />
        <Pagination
          currentPage={isMeta.currentPage} totalPages={isMeta.totalPages} onPageChange={(page) => {handlePageChange(page)}}/>
      </PostListStyled>
    </>
  );
}

const PostListStyled = styled.div`
  width: 100%;

`;

export default PostListPage;