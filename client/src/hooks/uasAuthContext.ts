import AuthContext from '../contexts/authContext.ts';
import { useContext } from 'react';
import { ILogin } from '../type/type.ts';
import { loginApi } from '../api/auth.api.ts';
import login from '../pages/users/Login.tsx';
import { useNavigate } from 'react-router-dom';

function useAuth() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 훅은 AuthProvider 내에서만 사용 가능합니다.');
  }

  const handleLogin = (data: ILogin) => {
    loginApi(data).then((res) => {
      if (res) {
        console.log(res.headers);
        localStorage.setItem('token', res.data.accessToken);
      }
      login();
      navigate('/');
    }).catch((err: any) => {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert('알 수 없는 오류');
      }
      throw err;
    });
  };

  return {
    context,
    handleLogin,
  };

}


export default useAuth; // { isAuth, login, logout }