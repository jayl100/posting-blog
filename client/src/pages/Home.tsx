import styled from 'styled-components';
import Button from '../components/buttons/Button.tsx';
import { IoIosArrowForward } from 'react-icons/io';
import Title from '../components/Title.tsx';
import PostsList from '../components/posts/PostsList.tsx';
import { useContext, useEffect } from 'react';
import AuthContext from '../contexts/authContext.ts';
import { useNavigate } from 'react-router-dom';
import usePosts from '../hooks/usePosts.ts';

function Home() {
  const { isAuth } = useContext(AuthContext);
  const { fetchPosts, isPosts } = usePosts();
  const navigate = useNavigate();


  useEffect(() => {
    fetchPosts(1, 4)
  }, []);

  const goToLink = () => {
    if (isAuth) {
      navigate('posts/posting')
    } else {
    navigate('users/signup')
    }
  }

  return (
    <>
      <HomeStyled>
        <div className="main">
          <Title bottomsize="40px">
            &nbsp;어서오세요~<br/>
            모두의 BLOG 입니다.
          </Title>
          {isAuth ?
          <Button buttontype='filled' onClick={goToLink}>시작하기</Button>
          :
            <Button buttontype='filled' onClick={goToLink}>시작하기</Button>
          }
        </div>
        <div className="contents">
          <div className="subtitle">
            <h2>최신글</h2>
            <a className="more" href="/posts">
              더보기 <IoIosArrowForward />
            </a>
          </div>
          <PostsList posts={isPosts} />
        </div>
      </HomeStyled>
    </>
  );
}

const HomeStyled = styled.div`
    width: 100%;

    .main {
        width: 100%;
        text-align: center;
        margin-bottom: 100px;

    }

    .subtitle {
        display: flex;
        flex-direction: row;
        align-items: end;
        justify-content: space-between;
        margin-bottom: 20px;

        h2 {
            font-size: ${ ({ theme }) => theme.fontSize.h2 };
        }

        .more {
            display: flex;
            align-items: center;
            gap: 2px;
            font-size: 14px;

            &:hover {
                color: ${ ({ theme }) => theme.color.primary };
                font-weight: 500;
            }
        }
    }
`;


export default Home;