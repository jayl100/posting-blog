import { ReactNode, useState } from 'react';
import AuthContext from './authContext';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = localStorage.getItem('token');

  const [ isAuth, setIsAuth ] = useState(!!token);

  const login = () => setIsAuth(true);
  // TODO: 실제 서버 로그인 로직 (토큰 저장 등) 처리 후 setIsAuth(true)

  const logout = () => setIsAuth(false);
  // TODO: 토큰 제거 등 후 setIsAuth(false)


  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;