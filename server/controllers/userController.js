const { signupService, loginService, logoutService } = require('../services/userService');
const { StatusCodes } = require('http-status-codes');


// 회원가입
const signup = async (req, res) => {
  const userInfo = req.body;

  try {
    if (await signupService(userInfo)) {
      return res.status(StatusCodes.CREATED).json({ message: '가입완료' });
    }
  } catch (err) {
    if (err.message === 'Service : 중복된 이메일과 이름입니다.') {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Controller: 중복된 이메일과 이름입니다.' });
    }
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
  }
};

const login = async (req, res) => {
  const userInfo = req.body; // email, password

  try {
    const token = await loginService(userInfo);

    if (token) {
      console.log('token : ', token);
      res.header('Authorization', `Bearer ${ token.accessToken }`);
      res.cookie('refreshToken', token.refreshToken, {
        httpOnly: true,
      });
      return res.status(StatusCodes.OK).json({ message: '로그인' });
    }

  } catch (err) {
    if (err.message === 'Service : 이메일과 비밀번호를 다시 확인해주세요.') {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Controller: fail login' });
    }
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
  }
};

const logout = async (req, res) => {
  const authUser = await req.payload;

  try {
    if (authUser) {
      await logoutService(authUser.id);
      return res.status(StatusCodes.OK).json({ message: '로그아웃 성공' });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Controller: fail logout' });

  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
  }
};


module.exports = { signup, login, logout };
