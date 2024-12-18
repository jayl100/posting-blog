import styled from 'styled-components';
import { formattedDate } from '../../utils/dateFormat.ts';
import { IPostList } from '../../type/type.ts';

interface PostListProps {
  posts: IPostList[];
}

function PostsList({ posts }: PostListProps) {

  const handlePostLink = (id: number) => {
    location.href = (`/posts/${id}`);
  };

  return (
    <>
      <PostListDetailStyled>
        <tbody>
        { posts.map((post: IPostList) => (
          <tr key={ post.id } onClick={() => handlePostLink(post.id)}>
            <td className="id">{ post.id }</td>
            <td className="title">{ post.title }</td>
            <td className="name">{ post.name }</td>
            <td className="date">{ formattedDate(post.createdAt) }</td>
          </tr>
        )) }
        </tbody>
      </PostListDetailStyled>
    </>
  );
}

const PostListDetailStyled = styled.table`
    display: flex;
    border-top: 2px solid ${ ({ theme }) => theme.color.secondary };
    border-bottom: 2px solid ${ ({ theme }) => theme.color.secondary };
    text-align: left;

tbody {
    width: 100%;
    tr {
        height: 80px;
        border-bottom: 1px solid ${ ({ theme }) => theme.color.d9 };
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        cursor: pointer;
        gap: 12px;
        
        .id {
            width: 60px;
            color: ${ ({ theme }) => theme.color.mediumGrey };
        }

        .title {
            width: 780px;
            font-weight: 700;
            color: ${ ({ theme }) => theme.color.secondary };
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .name {
            width: 130px;
            color: ${ ({ theme }) => theme.color.mediumGrey };
        }

        .date {
            width: 80px;
            color: ${ ({ theme }) => theme.color.mediumGrey };
        }

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background-color: ${ ({ theme }) => theme.color.f9 };

        }
    }
}

`;

export default PostsList;