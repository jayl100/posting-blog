const { User, Token } = require('../models');
const { generateHashPassword, matchPassword, generateAccessToken, generateRefreshToken } = require('../utils/auth');
const appError = require('../utils/appError');
const { StatusCodes } = require('http-status-codes');

// User = email, name, password(hashPassword)

// 회원가입
const signupService = async (userInfo) => {
  const { email, name, password } = userInfo;

  try {
    const existedEmail = await User.findOne({ where: { email: email } });
    const existedName = await User.findOne({ where: { name: name } });

    if (existedEmail || existedName) {
      throw new appError('이미 존재하는 이메일과 이름 입니다.', StatusCodes.CONFLICT);
    }

    if (password.length < 6) {
      throw new appError('비밀번호는 최소 6자 이상이어야 합니다.', StatusCodes.BAD_REQUEST);
    }

    const hashedPassword = await generateHashPassword(password);

    if (userInfo) {
    const newUser = await User.create({
      email: email,
      name: name,
      password: hashedPassword,
    });
    return newUser;
    }

    throw new appError('회원가입에 실패했습니다. 다시 한번 시도해 주세요.', StatusCodes.INTERNAL_SERVER_ERROR);

  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 로그인
const loginService = async function (userInfo) {
  try {
    const existedEmail = await User.findOne({ where: { email: userInfo.email } });

    if (!existedEmail) {
      throw new appError('존재하지 않은 이메일 입니다.', StatusCodes.NOT_FOUND);
    }

    if (!await matchPassword(userInfo)) {
      throw new appError('비밀번호를 다시 확인해 주세요.', StatusCodes.UNAUTHORIZED)
    }

    if (existedEmail && await matchPassword(userInfo)) {
      const accessToken = await generateAccessToken(existedEmail.id);
      const refreshToken = await generateRefreshToken(existedEmail.id);

      // 토큰 존재하면 업데이트, 없으면 생성
      await Token.upsert({
        userId: existedEmail.id,
        token: refreshToken,
      });

      return { accessToken: accessToken, refreshToken: refreshToken };
    }

    throw new appError('다시 시도해 주세요.', StatusCodes.INTERNAL_SERVER_ERROR);

  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 로그아웃
const logoutService = async (authUser) => {
  try {
    return await Token.destroy({ where: { userId: authUser.id } });

  } catch (err) {
    console.error(err);
    throw err;
  }
};

// put: 비밀번호 찾기 (재설정)
const resetPasswordService = async (userInfo) => {
  const { email, password } = userInfo;

  try {
    const matchUser = await User.findOne({ where: { email: email } });

    if (!matchUser) {
      throw new appError('일치하는 이메일이 없습니다.', StatusCodes.BAD_REQUEST);
    }

    if (password.length < 6) {
      throw new appError('6자 이상의 비밀번호를 입력해 주세요.', StatusCodes.BAD_REQUEST);
    }

    const newHashedPassword = await generateHashPassword(password);
    const reset = await matchUser.update({ password: newHashedPassword }); // 새 비번 업데이트

    if (!reset) {
      throw new appError('비밀번호 변경에 실패했습니다.', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    return reset;

  } catch (err) {
    console.error(err);
    throw err;
  }
};


module.exports = { signupService, loginService, logoutService, resetPasswordService };