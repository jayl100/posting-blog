import { useContext, useEffect, useState } from 'react';
import { IChangePassword, IDeleteUser } from '../type/type.ts';
import { userChangePWApi, userDeleteApi } from '../api/mypage.api.ts';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthContext from '../contexts/authContext.ts';

const useMypage = () => {
  const [ changePW, setChangePW ] = useState<IChangePassword>();
  const navigate = useNavigate();
  const {reset} = useForm();
  const {logout} = useContext(AuthContext);

  // 비밀번호 변경
  const handleChangePW = async (data: IChangePassword, setError: any) => {
    try {
      const res = await userChangePWApi(data)
      setChangePW(res);
      alert('비밀번호 변경이 완료되었습니다.');

    } catch (err: any) {
      if (err.response.data.message) {
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

  // 회원 탈퇴
  const handleDeleteUser = async (data: IDeleteUser, setError: any) => {
    try {

      const delConfirm = confirm('정말로 탈퇴하시겠습니까?');
      if (delConfirm) {
        await userDeleteApi(data);
        logout();
        alert('회원탈퇴가 완료되었습니다.');
        navigate('/');
      } else {
        reset();
      }

    } catch (err: any) {
      if (err.response.data.message) {
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

  return {
    handleChangePW,
    changePW,
    handleDeleteUser,
  };
}

export default useMypage;