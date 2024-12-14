const { StatusCodes } = require('http-status-codes');
const { verifyAccessToken } = require('../utils/auth');
const appError = require('../utils/appError');

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new appError('인증 토큰이 필요합니다.', StatusCodes.UNAUTHORIZED);
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      throw new appError('유효한 토큰이 아닙니다.', StatusCodes.UNAUTHORIZED);
    }

    const payload = await verifyAccessToken(token, process.env.JWT_KEY);
    req.payload = payload; // 인증된 사용자 정보를 req 객체에 추가

    next();

  } catch (err) {
    next(err);
  }
};

module.exports = { authMiddleware };