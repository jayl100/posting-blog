const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const saltRounds = 10;
const appError = require('../utils/appError');

// bcrypt = 계정 암호
// crypto = 토큰

// bcrypt 암호화
const generateHashPassword = async (password) => {
  try {
    const passwordString = password.toString();
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(passwordString, salt);

  } catch (err) {
    throw new Error('generateHashPassword', err);
  }
};

// 로그인 시 비밀번호 매칭
const matchPassword = async (userInfo) => {
  try {
    const matchPerson = await User.findOne({ where: { email: userInfo.email } });

    if (!matchPerson) {
      throw new appError('비밀번호를 다시 확인해 주세요', StatusCodes.UNAUTHORIZED)
    }

    const match = await bcrypt.compare(userInfo.password, matchPerson.password);
    return match;

  } catch (err) {
    throw new Error('matchPassword', err);
  }
};

// 토큰 생성
const generateAccessToken = (id) => {
  const data = { id: id };
  const token = jwt.sign(
    data,
    process.env.JWT_KEY,
    { expiresIn: '1d', issuer: process.env.JWT_ISSUER }
  );
  return token;
};

// 리프레시 토큰 생성
const generateRefreshToken = (id) => {
  try {
    const data = { id: id };
    const token = jwt.sign(data, process.env.JWT_REFRESH_KEY, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
      issuer: process.env.JWT_ISSUER
    });

    return token;

  } catch (err) {
    throw new Error('refreshToken', err);
  }
};

// 토큰 인증
const verifyAccessToken = async (token, secret) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (err) {
    console.error(err);
    throw new Error('Unauthorized');
  }
};

// 리프레시 토큰 인증
const verifyRefreshToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_KEY);
  } catch (err) {
    console.error(err);
    throw new Error('Unauthorized');
  }
};

module.exports = {
  generateHashPassword,
  matchPassword,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};