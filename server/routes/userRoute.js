const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

const { signup, login, logout, resetPassword } = require('../controllers/userController');

// 회원가입
router.post('/signup', signup);

// 로그인
router.post('/login', login);

// 로그아웃
router.delete('/logout', authMiddleware, logout);

// 리프레시 토큰
router.get('/refresh');

// 비밀번호 재설정 (찾기)
router.put('/reset', resetPassword);

module.exports = router;