import styled from 'styled-components';
import { fetchPostsApi } from '../../api/posts.api.ts';
import usePosts from '../../hooks/usePosts.ts';
import { data } from 'react-router-dom';

function PostListDetail() {

  const postHandler = () => {
    isFetchingPost
  }

  return (
    <>
      <PostListDetailStyled>

        <tr className="th_list">
          <th scope="col">id</th>
          <th scope="col">title</th>
          <th scope="col">name</th>
          <th scope="col">date</th>
        </tr>
        <tr>
          <td>1</td>
          <td>타이틀 제목입니다.</td>
          <td>이름인데요?</td>
          <td>24.10.12</td>
        </tr>
        {/*<tr>*/}
        {/*  <td>${id}</td>*/}
        {/*  <td>${title}</td>*/}
        {/*  <td>${name}</td>*/}
        {/*  <td>${date}</td>*/}
        {/*</tr>*/}

      </PostListDetailStyled>
    </>
  );
}

const PostListDetailStyled = styled.div`
    .th_list {
        display: none;
    }
`;

export default PostListDetail;