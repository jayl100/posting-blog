const { Token } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { generateAccessToken } = require('../utils/auth');

const refreshToken = async (req, res, next) => {
  const refreshTokenCookie = req.headers.cookie;

  if (!refreshTokenCookie) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Refresh token is required' });
  }

  try {
    const refreshToken = refreshTokenCookie.split('=')[1];
    // const decoded = await verifyRefreshToken(refreshToken); // { id: 15, iat: 1734095055, exp: 1734699855, iss: 'jay' }

    // 데이터베이스에서 리프레시 토큰 찾기
    const storedToken = await Token.findOne({ where: { token: refreshToken } });

    // 리프레시 토큰 만료 여부 확인
    if (!storedToken) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'refresh token expired' });
    }

    // 새로운 액세스 토큰 생성
    const token = await generateAccessToken(storedToken.userId);

    if (token) {
      console.log('token: ', token);
      res.header('Authorization', `Bearer ${ token }`);
      return res.status(StatusCodes.OK).json({
        message: '새로운 토큰 발급 성공',
        accessToken: token
      });
    }

  } catch (err) {
    next(err);

  }
};

module.exports = { refreshToken };