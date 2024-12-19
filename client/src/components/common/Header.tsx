import styled from 'styled-components';
import logo from '../../assets/BLOG_primary.svg';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext.ts';
import useAuth from '../../hooks/useAuth.ts';
import { Link, useNavigate } from 'react-router-dom';


function Header() {
  const { isAuth } = useContext(AuthContext);
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const resetPost = () => {
    navigate('/posts/posting')
    location.reload();
  }

  return (
    <>
      <WidthStyled>
        <Contents>
          <div>
            <a href="/">
              <img src={ logo } alt="logo" />
            </a>
          </div>
          <ul className="nav">
            <li><Link to={`/posts`}>게시판</Link></li>
            { isAuth ? <li><Link to="/posts/posting" onClick={resetPost}>글쓰기</Link></li> : "" }
          </ul>
          { isAuth ?
            (<ul>
              <li><Link to='/' onClick={ handleLogout }>로그아웃</Link></li>
              <li><Link to="/users/mypage">마이페이지</Link></li>
            </ul>)
            :
            (<ul>
              <li><Link to="/users/Login">로그인</Link></li>
              <li><Link to="/users/signup">회원가입</Link></li>
            </ul>)
          }
        </Contents>
      </WidthStyled>
      <HeaderStyled />
    </>
  );
}

const WidthStyled = styled.div`
    max-width: ${ ({ theme }) => theme.width.default };
    width: 100%;

    margin: 0 auto;
    padding: 0 20px;
    height: 80px;
`;


const Contents = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;


    display: flex;
    flex-wrap: nowrap;

    align-items: center;
    justify-content: space-between;
    flex-direction: row;


    ul {
        display: flex;
        gap: 2rem;
    }

    a:hover {
        color: ${ ({ theme }) => theme.color.primary };
    }

    .nav {
        font-size: ${ ({ theme }) => theme.fontSize.h3 };
        font-weight: 600;
    }
`;

const HeaderStyled = styled.div`
    border-bottom: 1px solid ${ ({ theme }) => theme.color.d9 };
`;

export default Header;