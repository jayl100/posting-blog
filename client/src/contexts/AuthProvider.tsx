import { ReactNode, useState } from 'react';
import AuthContext from './authContext';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = localStorage.getItem('token');
  const [ isAuth, setIsAuth ] = useState(!!token);

  const login = () => setIsAuth(true);

  const logout = () => setIsAuth(false);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;