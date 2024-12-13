const { StatusCodes } = require('http-status-codes');
const { verifyAccessToken } = require('../utils/auth');

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: '인증 토큰이 필요합니다.' });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: '유효한 토큰이 아닙니다.' });
    }

    const payload = await verifyAccessToken(token, process.env.JWT_KEY);
    req.payload = payload; // 인증된 사용자 정보를 req 객체에 추가

    next();

  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: '유효하지 않은 토큰입니다.' });
  }
};

module.exports = { authMiddleware };