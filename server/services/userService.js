const { User, Token } = require('../models');
const { generateHashPassword, matchPassword, generateAccessToken, generateRefreshToken } = require('../utils/auth');

// User = email, name, password(hashPassword)

// 회원가입
const signupService = async (userInfo) => {
  const { email, name, password } = userInfo;

  try {
    const existedEmail = await User.findOne({ where: { email: email } });
    const existedName = await User.findOne({ where: { name: name } });

    if (existedEmail || existedName) {
      throw new Error('Service : 중복된 이메일과 이름입니다.');
    }

    const hashedPassword = await generateHashPassword(password);

    const newUser = await User.create({
      email: email,
      name: name,
      password: hashedPassword,
    });
    return newUser;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 로그인
const loginService = async function (userInfo) {
  try {
    const existedEmail = await User.findOne({ where: { email: userInfo.email } });

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

    throw new Error('Service : 이메일과 비밀번호를 다시 확인해주세요.');

  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 로그아웃
const logoutService = async (userId) => {
  try {
    return await Token.destroy({ where: { userId: userId } });

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
      throw new Error('Service : 일치하는 회원이 없습니다.');
      return;
    }

    const newHashedPassword = await generateHashPassword(password);
    const reset = await matchUser.update({ where: { password: newHashedPassword } }); // 새 비번 업데이트

    return reset;

  } catch (err) {
    console.error(err);
    throw err;
  }
};


module.exports = { signupService, loginService, logoutService, resetPasswordService };