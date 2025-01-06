import styled from 'styled-components';
import { useContext, useState } from 'react';
import AuthContext from '../../contexts/authContext.ts';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title.tsx';
import MyTabMenu from '../../components/mypage/MyTabMenu.tsx';
import MyChangePassword from '../../components/mypage/MyChangePassword.tsx';
import MyWithdraw from '../../components/mypage/MyWidthdraw.tsx';
import MyPosts from '../../components/mypage/MyPosts';

function Mypage() {
  const navigate = useNavigate();
  const { isAuth, getInfo, logout } = useContext(AuthContext);
  const [ activeTab, setActiveTab ] = useState('posts')

  if (!isAuth) {
    alert('권한이 없습니다.');
    logout();
    navigate('/');
  }


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
        <MyTabMenu activeTab={activeTab} setActiveTab={setActiveTab}/>
        <div className="tap-content">
          { activeTab === 'posts' && <MyPosts /> }
          { activeTab === 'reset' && <MyChangePassword /> }
          { activeTab === 'withdraw' && <MyWithdraw /> }
        </div>
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
    justify-content: center;
    justify-items: center;
    

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

    .tap-content {
        display: contents;
        //flex-direction: row;
        //align-items: center;
        //margin-bottom: 60px;
        
    }


`;

export default Mypage;