import { ReactNode, useEffect, useState } from 'react';
import AuthContext from './authContext';
import { IUser } from '../type/type.ts';
import { userInfoApi } from '../api/mypage.api.ts';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = localStorage.getItem('token');
  const [ isAuth, setIsAuth ] = useState(!!token);
  const [ getInfo, setGetInfo ] = useState<IUser | null>(null)

  const login = () => {
    setIsAuth(true);
    location.href = ('/')
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    setGetInfo(null);
    location.href = ('/');
  };


  useEffect(() => {
    if (isAuth && !getInfo) {
      userInfoApi().then((res) => {
        setGetInfo(res);

      }).catch(() => {
        logout();
      })
    }
  }, [ isAuth, getInfo ]);

  return (
    <AuthContext.Provider value={ { isAuth, login, logout, getInfo } }>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;