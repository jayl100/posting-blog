import { ILogin, IResetPassword, ISignup } from '../type/type.ts';
import { loginApi, resetPWApi, signupApi } from '../api/auth.api.ts';
import { useContext } from 'react';
import AuthContext from '../contexts/authContext.ts';
import { useNavigate } from 'react-router-dom';


const useAuth = () => {
  const { isAuth, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (data: ISignup, setError: any) => {
    try {
      const res = await signupApi(data);
      if (res) {
        alert(`${ data.name }님 회원가입을 환영합니다.`);
        navigate('/users/login');
      }
    } catch (err: any) {
      if (err.response.data) {
        setError('root', {
          type: 'server',
          message: err.response.data.message,
        })
      } else {
        alert('알 수 없는 오류');
      }
      throw err;
    }
  }

  const handleLogin = async (data: ILogin, setError: any) => {
    try {
      const res = await loginApi(data);
      if (res) {
        localStorage.setItem('token', res.data.token);
        login(res.data.user);
        alert('로그인에 성공했습니다.');
        navigate('/');
      }
    } catch (err: any) {
      if (err.response.data) {
        setError('root', {
          type: 'server',
          message: err.response.data.message,
        })
      } else {
        alert('알 수 없는 오류');
      }
      throw err;
    }
  }

  const handleLogout = () => {
    try {
      if (isAuth) {
        logout();
        alert('성공적으로 로그아웃 되었습니다.');
        localStorage.removeItem('token');
        navigate('/');
      }

    } catch (err: any) {
      alert('로그아웃에 실패했습니다.')
      throw err;
    }
  };

  const handleResetPW = async (data: IResetPassword, setError: any) => {
    try {
      await resetPWApi(data);
      alert('비밀번호가 변경되었습니다.');
      navigate('/users/login');
    } catch (err: any) {
      if (err.response.data) {
        setError('root', {
          type: 'server',
          message: err.response.data.message,
        })
      } else {
        alert('알 수 없는 오류');
      }
      throw err;
    }
  }

  return { handleLogin, handleLogout, handleSignup, handleResetPW };
};


export default useAuth;