const { signupService, loginService, logoutService, resetPasswordService } = require('../services/userService');
const { StatusCodes } = require('http-status-codes');


// 회원가입
const signup = async (req, res, next) => {
  try {
    const userInfo = req.body;

    if (await signupService(userInfo)) {
      return res.status(StatusCodes.CREATED).json({ message: '가입완료' });
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Controller: 중복된 이메일과 이름입니다.' });

  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const userInfo = req.body; // email, password
    const token = await loginService(userInfo);

    if (!token) {
      throw new Error('이메일이나 비밀번호가 일치하지 않습니다.');
    }

    console.log('token : ', token);
    res.header('Authorization', `Bearer ${ token.accessToken }`);
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
    });

    return res.status(StatusCodes.OK).json({ message: '로그인 성공' });


  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const authUser = await req.payload;

    if (authUser) {
      await logoutService(authUser);
      return res.status(StatusCodes.OK).json({ message: '로그아웃 성공' });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Controller: fail logout' });

  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const userInfo = req.body; // email, newPassword

    if (userInfo) {
      await resetPasswordService(userInfo);
      return res.status(StatusCodes.CREATED).json({ message: '비밀번호 재설정이 완료되었습니다.' });
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Controller: fail reset password' });

  } catch (err) {
    next(err);
  }
};


module.exports = { signup, login, logout, resetPassword };
