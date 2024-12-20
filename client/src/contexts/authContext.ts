import { createContext } from 'react';
import { IUser } from '../type/type.ts';

interface AuthContextType {
  isAuth: boolean;
  login: (userData: IUser) => void;
  logout: () => void;
  getInfo: IUser | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  login: () => {},
  logout: () => {},
  getInfo: null,
});

export default AuthContext;