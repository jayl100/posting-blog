import styled from 'styled-components';
import logo from '/logo_white.svg';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext.ts';

function Footer() {
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      <FooterStyled>
        <MaxWidthContainer>
          <div className="contents">
            <div className="left">
              <div className="logo">
                <img src={ logo } alt="" />
              </div>
              <p>
                Copyright 2025. BLOG All pictures cannot be copied without permission.
              </p>
            </div>
            <div className="right">
              { isAuth ?
                (<>
                    <a href="/users/mypage">마이페이지</a>
                    <a href="/posts/posting">글쓰기</a>
                  </>)
                :
                (<>
                    <a href="/users/signup">회원가입</a>
                    <a href="/users/login">로그인</a>
                  </>)
              }
              <a href="/posts">게시판</a>
            </div>
          </div>
        </MaxWidthContainer>
      </FooterStyled>
    </>
  );
}

const FooterStyled = styled.div`
    background-color: ${ ({ theme }) => theme.color.secondary };
`;

const MaxWidthContainer = styled.div`
    max-width: ${ ({ theme }) => theme.width.default };
    height: 360px;
    padding: 80px 20px;
    margin: 0 auto;
    
    .contents {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        
        margin: 0 auto;
        color: #fff;

        .left {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            
            img {
                width: 120px;
            }
        }

        .right {
            display: flex;
            flex-direction: column-reverse;
            gap: 1.8rem;
            font-size: ${ ({ theme }) => theme.fontSize.h3 };
            font-weight: 500;
            text-align: right;

            a:hover {
                color: ${ ({ theme }) => theme.color.lightGrey };
            }
        }
    }

`;

export default Footer;