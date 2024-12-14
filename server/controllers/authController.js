const { Token } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { generateAccessToken, verifyRefreshToken } = require('../utils/auth');
const appError = require('../utils/appError');

const refreshToken = async (req, res, next) => {
  const refreshTokenCookie = req.headers.cookie;

  if (!refreshTokenCookie) {
    throw new appError('리프레시 토큰이 필요합니다.', StatusCodes.BAD_REQUEST);
  }

  try {
    const refreshToken = refreshTokenCookie.split('=')[1];
    const decoded = await verifyRefreshToken(refreshToken); // { id: 15, iat: 1734095055, exp: 1734699855, iss: 'jay' }

    // 데이터베이스에서 리프레시 토큰 찾기
    const storedToken = await Token.findOne({ where: { token: refreshToken } });

    // 리프레시 토큰 만료 여부 확인
    if (!storedToken) {
      throw new appError('refresh token expired or invalid', StatusCodes.FORBIDDEN);
    }

    // 새로운 액세스 토큰 생성
    const token = await generateAccessToken(decoded.userId);

    console.log('token: ', token);
    res.header('Authorization', `Bearer ${ token }`);
    return res.status(StatusCodes.OK).json({
      message: '새로운 토큰 발급 성공',
      accessToken: token
    });

  } catch (err) {
    next(err);

  }
};

module.exports = { refreshToken };