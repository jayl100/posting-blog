import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home.tsx';
import Container from '../components/common/Container.tsx';
import PostDetail from '../pages/posts/PostDetail.tsx';
import PostWrite from '../pages/posts/PostWrite.tsx';
import PasswordReset from '../pages/users/PasswordReset.tsx';
import Login from '../pages/users/Login.tsx';
import Signup from '../pages/users/Signup.tsx';
import Mypage from '../pages/mypage/Mypage.tsx';

const routeList = [
  {
    path: '/',
    element: <Home />,
    width: 1200,
  },
  // posts
  {
    path: '/posts',
    element: <PostDetail/>,
    width: 1200,
  },
  {
    path: '/posts/write',
    element: <PostWrite />,
    width: 800,
  },
  {
    path: '/posts/:id',
    element: <PostDetail/>,
    width: 800,
  },
  // users
  {
    path: '/users/signup',
    element: <Signup />,
    width: 600,
  },
  {
    path: '/users/login',
    element: <Login />,
    width: 600,
  },
  {
    path: '/users/reset',
    element: <PasswordReset />,
    width: 600,
  },
  // mypage
  {
    path: '/mypage',
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