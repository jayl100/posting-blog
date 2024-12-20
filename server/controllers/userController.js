const { signupService, loginService, logoutService, resetPasswordService } = require('../services/userService');
const { StatusCodes } = require('http-status-codes');
const appError = require('../utils/appError');


// 회원가입
const signup = async (req, res, next) => {
  try {
    const userInfo = req.body; // email, name, password

    if (!userInfo.email || !userInfo.name || !userInfo.password) {
      throw new appError('입력항목을 모두 입력해 주세요.', StatusCodes.BAD_REQUEST);
    }

    if (await signupService(userInfo)) {
      return res.status(StatusCodes.CREATED).json({ message: '가입이 완료되었습니다.' });
    }

    throw new appError('중복된 이메일과 이름입니다.', StatusCodes.BAD_REQUEST);

  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const userInfo = req.body; // email, password

    if (!userInfo.email || !userInfo.password) {
      throw new appError('이메일과 비밀번호를 입력해 주세요.', StatusCodes.BAD_REQUEST);
    }

    const token = await loginService(userInfo);

    console.log('token : ', token);
    res.header('Authorization', `Bearer ${ token.accessToken }`);
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
    });

    return res.status(StatusCodes.OK).json({
      message: '로그인 성공',
      token: token.accessToken,
      user: {
        email: userInfo.email,
        password: userInfo.password,
      }
    });

  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const authUser = await req.payload;

    await logoutService(authUser);
    return res.status(StatusCodes.OK).json({ message: '로그아웃 성공' });

  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const userInfo = req.body; // email, newPassword

    if (!userInfo.email || !userInfo.password) {
      throw new appError('내용을 모두 입력해 주세요.', StatusCodes.BAD_REQUEST);
    }

    await resetPasswordService(userInfo);
    return res.status(StatusCodes.CREATED).json({ message: '비밀번호 재설정이 완료되었습니다.' });

  } catch (err) {
    next(err);
  }
};


module.exports = { signup, login, logout, resetPassword };
