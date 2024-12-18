import AuthContext from '../contexts/authContext.ts';
import { createContext } from 'react';

function uasAuthContext() {
  const context = createContext(AuthContext);

  if (!context) {
    throw new Error('useContext 훅은 AuthProvider 내에서만 사용 가능합니다.');
  }

  return context;
}

export default uasAuthContext; // { isAuth, login, logout }