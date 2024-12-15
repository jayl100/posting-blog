import styled from 'styled-components';
import logo from '../../assets/BLOG_footer.svg';

function Footer() {
  return (
    <FooterStyled>
      <Contents>
        <div className="left">
          <div className="logo">
            <img src={ logo } alt="" />
          </div>
          <p>
            Copyright 2024. BLOG All pictures cannot be copied without permission.
          </p>
        </div>
        <div className="right">
          <a href="/">게시판</a>
          <a href="/">글쓰기</a>
          <a href="/">로그인</a>
        </div>

      </Contents>
    </FooterStyled>
  );
}

const FooterStyled = styled.div`
    background-color: ${ ({ theme }) => theme.color.secondary };
`;

const Contents = styled.div`

    width: ${ ({ theme }) => theme.width.default };
    height: 360px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
    padding: 80px 0;

    color: #fff;

    .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .right {
        display: flex;
        flex-direction: column-reverse;
        gap: 1.8rem;
        font-size: ${({ theme }) => theme.fontSize.h3};
        font-weight: 500;
    }

`;

export default Footer;