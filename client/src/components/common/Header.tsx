import styled from 'styled-components';
import logo from '../../assets/BLOG_primary.svg';
import theme from '../../theme/theme.ts';


function Header() {
  return (
    <HeaderStyled>
      <Contents>
        <div>
          <a href="/">
            <img src={ logo } alt="logo" />
          </a>
        </div>
        <ul className="nav">
          <li>
            <a href="/posts">게시판</a>
          </li>
          <li><a href="/posts/write">글쓰기</a></li>
        </ul>
        <ul>
          <li><a href="/users/login">로그인</a></li>
          <li><a href="/users/signup">회원가입</a></li>
        </ul>
      </Contents>
    </HeaderStyled>
  );
}


const HeaderStyled = styled.div`
    border-bottom: 1px solid ${ ({ theme }) => theme.colours.d9 };
`;

const Contents = styled.div`
    width: ${ ({ theme }) => theme.width.default };
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    ul {
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    a:active {
        color: ${ theme.colours.primary };
    }

    .nav {
        font-size: 1.2rem;
        font-weight: 600;
    }
`;

export default Header;