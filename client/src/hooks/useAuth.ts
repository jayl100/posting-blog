import { ILogin } from '../type/type.ts';
import { loginApi } from '../api/auth.api.ts';
import { useContext } from 'react';
import AuthContext from '../contexts/authContext.ts';


const useAuth = () => {
  const { isAuth, login, logout } = useContext(AuthContext);

  const handleLogin = (data: ILogin) => {

    loginApi(data).then((res) => {
      if (res) {
        console.log('asdfasdfasdf', res.data.token);
        localStorage.setItem('token', res.data.token);
      }
      login();
      alert('login successful');
      location.href = ('/');

    }).catch((err: any) => {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert('알 수 없는 오류');
      }
      throw err;
    });
  };

  const handleLogout = () => {

    if (isAuth) {
        logout();
        alert('logout successful');
        localStorage.removeItem('token');

      // navigate('/');
    } else {
      throw new Error('logout failed');
    }
  };


  return { handleLogin, handleLogout };
};


export default useAuth;