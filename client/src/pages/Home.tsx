import styled from 'styled-components';
import Button from '../components/buttons/Button.tsx';
import LatestPosts from '../components/LatestPosts.tsx';
import moreIcon from '../assets/more_icon.svg';

function Home() {
  return (
    <>
      <HomeStyled>
        <div className="main">
          <h1>
            안녕하세요.<br />
            모두의 BLOG 입니다.
          </h1>
          <Button button="filled">시작하기</Button>
        </div>
        <div className="contents">
          <div className="subtitle">
            <h2>최신글</h2>
            <a className="more" href="/">
              더보기
              <img src={ moreIcon } alt="more-icon" />
            </a>
          </div>
          <LatestPosts />
        </div>
      </HomeStyled>
    </>
  );
}

const HomeStyled = styled.div`

    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;

        h1 {
            font-size: ${ ({ theme }) => theme.fontSize.h1 };
            text-align: center;
        }
    }

    .subtitle {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        h2 {
            font-size: ${ ({ theme }) => theme.fontSize.h2 };
        }
        
        a {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 14px;
        }
    }
`;


export default Home;