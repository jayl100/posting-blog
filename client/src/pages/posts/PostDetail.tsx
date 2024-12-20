import styled from 'styled-components';
import usePost from '../../hooks/usePost.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { formattedDate } from '../../utils/dateFormat.ts';
import Title from '../../components/Title.tsx';
import Button from '../../components/buttons/Button.tsx';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext.ts';


function PostDetail() {
  const navigate = useNavigate();
  const { isAuth, getInfo } = useContext(AuthContext);
  const { id } = useParams() as { id: string };
  const idInt = parseInt(id);
  const { isPostInfo } = usePost(idInt);

  // loading
  if (!isPostInfo) {
    return null;
  }

  const userAuth = getInfo?.id === isPostInfo.userId

  const letsGoModify = () => {
    if (!isAuth && !userAuth) return null;
    navigate( `/posts/posting/${idInt}`);
  };

  console.log(isPostInfo.userId, ',alsdjf,', getInfo?.id)



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
        <Button buttontype="sFilled" onClick={ () => {navigate(-1)} }>목록</Button>
        { isAuth && userAuth ?
          <div className="auth-btn">
            <Button buttontype="sOutlined" onClick={letsGoModify}>수정</Button>
            <Button buttontype="sOutlined" onClick={ () => { navigate(1)} }>삭제</Button>
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