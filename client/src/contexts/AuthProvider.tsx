import { useState } from 'react';
import AuthContext from './index.ts';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={ { isAuthenticated, login, logout } }>
      { children }
    </AuthContext.Provider>
)
};

export default AuthProvider;