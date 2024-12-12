const express = require('express');
const router = express.Router();

const {signup, login, logout} = require('../controllers/userController');

// 회원가입
router.post('/signup', signup);

// 로그인
router.post('/login', login);

// 로그아웃
router.delete('/logout', logout);

module.exports = router;