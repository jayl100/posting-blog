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
import ProtectedRoute from '../components/protect/ProtectedRoute.tsx';
import NotFoundPage from '../pages/NotFound.tsx';

interface RouteType {
  path: string;
  element: JSX.Element;
  width: number;
  protected: boolean;
}

const routeList: RouteType[] = [
  {
    path: '/',
    element: <Home />,
    width: 1200,
    protected: false,
  },
  // posts
  {
    path: '/posts',
    element: <PostListPage/>,
    width: 1200,
    protected: false,
  },
  {
    path: '/posts/posting',
    element: <PostingPage />,
    width: 1000,
    protected: true,
  },
  {
    path: `/posts/posting/:id`,
    element: <PostingPage />,
    width: 1000,
    protected: true,
  },
  {
    path: '/posts/:id',
    element: <PostDetail/>,
    width: 1000,
    protected: false,
  },
  // users
  {
    path: '/users/signup',
    element: <Signup />,
    width: 600,
    protected: false,
  },
  {
    path: '/users/login',
    element: <LoginPage />,
    width: 600,
    protected: false,
  },
  {
    path: '/users/reset',
    element: <PasswordReset />,
    width: 600,
    protected: false,
  },
  // mypage
  {
    path: '/users/mypage',
    element: <Mypage />,
    width: 1200,
    protected: true,
  },
  // 404
  {
    path: '*',
    element: <NotFoundPage />,
    width: 1200,
    protected: false,
  },
];

const router = createBrowserRouter(
  routeList.map((route) => {
    const wrappedElement = route.protected ? (
      <ProtectedRoute>
        <Container width={route.width}>{route.element}</Container>
      </ProtectedRoute>
    ) : (
      <Container width={ route.width }>{ route.element }</ Container>
    );

    return {
      path: route.path,
      element:wrappedElement,
    };
  }),
);

export default router;