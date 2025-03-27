import styled from 'styled-components';
import logo from '/logo.svg';
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
      <Contents>
        <div className="left">
          <a href="/">
            <img src={ logo } alt="logo" />
          </a>
        </div>
        <ul className="middle">
          <li><Link to={ `/posts` }>게시판</Link></li>
          { isAuth && <li><Link to="/posts/posting" onClick={resetPost}>글쓰기</Link></li>}
        </ul>
        <div className="right">
          { isAuth ?
            (<ul>
              <li><Link to="/" onClick={ handleLogout }>로그아웃</Link></li>
              <li><Link to="/users/mypage">마이페이지</Link></li>
            </ul>)
            :
            (<ul>
              <li><Link to="/users/Login">로그인</Link></li>
              <li><Link to="/users/signup">회원가입</Link></li>
            </ul>)
          }
        </div>
      </Contents>
      <HeaderStyled />
    </>
  );
}


const Contents = styled.div`
    max-width: ${ ({ theme }) => theme.width.default };
    width: 100%;
    height: 80px;
    margin: 0 auto;
    padding: 0 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
        width: 33%;
        
        a {
            display: flex;
        }
    }

    .right {
        width: 33%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        ul {
            display: flex;
            gap: 2rem;
        }
    }

    .middle {
        width: 34%;
        font-size: ${ ({ theme }) => theme.fontSize.h3 };
        font-weight: 600;
        display: flex;
        justify-content: center;
        gap: 1.6rem;
    }

    a:hover {
        color: ${ ({ theme }) => theme.color.primary };
    }
`;

const HeaderStyled = styled.div`
    border-bottom: 1px solid ${ ({ theme }) => theme.color.d9 };
    background-color: #fff;
`;

export default Header;