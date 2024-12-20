import { useState } from 'react';
import { IChangePassword } from '../type/type.ts';
import { userChangePsApi } from '../api/mypage.api.ts';


const useMypage = () => {

  const [ changePW, setChangePW ] = useState<IChangePassword>();

  const handleChangePW = (data: IChangePassword) => {
    userChangePsApi(data).then((res) => {
      setChangePW(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  return {
    handleChangePW,
    changePW,
  };
}

export default useMypage;