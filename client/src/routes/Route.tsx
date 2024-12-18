import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home.tsx';
import Container from '../components/common/Container.tsx';
import PostDetail from '../pages/posts/PostDetail.tsx';
import PostingPage from '../pages/posts/PostingPage.tsx';
import PasswordReset from '../pages/users/PasswordReset.tsx';
import LoginPage from '../pages/users/LoginPage.tsx';
import Signup from '../pages/users/Signup.tsx';
import Mypage from '../pages/mypage/Mypage.tsx';
import PostListPage from '../pages/posts/PostListPage.tsx';

const routeList = [
  {
    path: '/',
    element: <Home />,
    width: 1200,
  },
  // posts
  {
    path: '/posts',
    element: <PostListPage/>,
    width: 1200,
  },
  {
    path: '/posts/posting',
    element: <PostingPage />,
    width: 1000,
  },
  {
    path: '/posts/:id',
    element: <PostDetail/>,
    width: 1000,
  },
  {
    path: '/posts/detail',
    element: <PostDetail/>,
    width: 1000,
  },
  // users
  {
    path: '/users/signup',
    element: <Signup />,
    width: 600,
  },
  {
    path: '/users/login',
    element: <LoginPage />,
    width: 600,
  },
  {
    path: '/users/reset',
    element: <PasswordReset />,
    width: 600,
  },
  // mypage
  {
    path: '/users/mypage',
    element: <Mypage />,
    width: 1200,
  },
];

const router = createBrowserRouter(
  routeList.map((route) => {
    return {
      ...route,
      element:
        <Container width={ route.width }>
          { route.element }
        </ Container>,
    };
  }),
);

export default router;