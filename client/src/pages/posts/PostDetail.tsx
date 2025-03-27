import styled from 'styled-components';
import usePost from '../../hooks/usePost.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { formattedDate } from '../../utils/dateFormat.ts';
import Title from '../../components/Title.tsx';
import Button from '../../components/buttons/Button.tsx';
import { useContext, useEffect } from 'react';
import AuthContext from '../../contexts/authContext.ts';


function PostDetail() {
  const { isAuth, getInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const idInt = parseInt(id);
  const { isPostInfo, fetchPost, deletePost } = usePost();

  useEffect(() => {
    fetchPost(idInt)
  }, [isPostInfo?.updatedAt]);

  // loading
  if (!isPostInfo) {
    return null;
  }
  const userAuth = getInfo?.id === isPostInfo.userId


  const letsGoModify = () => {
    if (!isAuth && !userAuth) {
      alert('권한이 없습니다.');
      return null;
    }
    navigate( `/posts/posting/${idInt}`);
  };

  const letsGoDelete = async () => {
    if (!isAuth && !userAuth) {
      alert('권한이 없습니다.');
      return null;
    }

    const delAlert = confirm('게시글을 삭제하시겠습니까?')
    if (delAlert) {
    await deletePost(idInt);
    }
  }

  return (
    <>
    <PostDetailStyled>
      <div className="title">
        <div>{ formattedDate(isPostInfo.createdAt) }</div>
        <Title bottomsize="60px">{ isPostInfo.title }</Title>
      </div>
      <div className="content">
        <div className="text">{ isPostInfo.content }</div>
      </div>
      <div className="btn">
        <Button buttontype="sFilled" onClick={ () => {navigate('/posts')} }>목록</Button>
        { isAuth && userAuth ?
          <div className="auth-btn">
            <Button buttontype="sOutlined" onClick={letsGoModify}>수정</Button>
            <Button buttontype="sOutlined" onClick={letsGoDelete}>삭제</Button>
          </div>
          :
          ''
        }
      </div>
    </PostDetailStyled>
    </>
  );
}

const PostDetailStyled = styled.div`
    width: 100%;

    .title {
        width: 100%;
        text-align: center;
        word-break: break-word;

        div {
            margin-bottom: 12px;
            color: ${ ({ theme }) => theme.color.lightGrey };
        }
    }

    .content {
        height: 100%;
        border-top: 2px solid ${ ({ theme }) => theme.color.secondary };
        border-bottom: 2px solid ${ ({ theme }) => theme.color.secondary };
        padding: 40px 20px;

        .text {
            word-break: break-word;
            line-height: 1.6;
            color: ${ ({ theme }) => theme.color.mediumGrey };
            white-space: pre-wrap;
        }
    }

    .btn {
        margin-top: 20px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .auth-btn {
            display: flex;
            gap: 12px;
        }

    }
`;

export default PostDetail;