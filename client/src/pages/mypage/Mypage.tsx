import styled from 'styled-components';
import { useContext, useEffect } from 'react';

import AuthContext from '../../contexts/authContext.ts';
import { useNavigate } from 'react-router-dom';
import MyPosts from '../../components/mypage/myPosts.tsx';
import Title from '../../components/Title.tsx';
import theme from '../../theme/theme.ts';


function Mypage() {
  const navigate = useNavigate();
  const { isAuth, getInfo } = useContext(AuthContext);

  if (!isAuth) {
    alert('여기 아니야');
    navigate('/');
  }

  console.log(getInfo)


  return (
    <>
      <MypageStyled>
        <Title bottomsize="20px">
          <span>{ getInfo?.name }님 </span>
          <span style={ { fontWeight: 400 } }>안녕하세요.</span>
        </Title>
        <div className="email-box">
          <p>{ getInfo?.email }</p>
        </div>
        <div className="tap">
          <button>나의 게시글</button>
          <button>비밀번호 변경하기</button>
          <button>회원 탈퇴하기</button>
        </div>
        <MyPosts />
      </MypageStyled>
    </>
  );
}

const MypageStyled = styled.div`
    width: 100%;
    //text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .email-box {
        background-color: #f2f2f2;
        width: fit-content;
        border-radius: 12px;
        margin-bottom: 80px;
        padding: 18px 40px;

        p {
            word-break: break-word;
            line-height: 1.6;
            text-align: center;
        }
    }

    .tap {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 60px;
        
        button {
            text-align: center;
            align-content: center;
            width: 178px;
            height: 60px;
            border-bottom: 1px solid ${({ theme }) => theme.color.d9};
            color: ${({ theme }) => theme.color.mediumGrey};
            background-color: #fff;
            font-size: 16px;
            font-weight: 400;
            
            &:active {
                border-bottom: 1px solid ${({ theme }) => theme.color.primary};
                color: ${({ theme }) => theme.color.primary};
                font-weight: 600;
            }
        }
        
        
    }


`;

export default Mypage;