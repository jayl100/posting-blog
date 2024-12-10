const express = require('express');
const router = express.Router();

// 회원가입
router.post('/signup', (req, res) => {
	res.json({ message: 'Hello World!' });
});

// 로그인
router.post('/', (req, res) => {
	res.json({ message: 'login!' });
});

// 로그아웃
router.delete('/logout', (req, res) => {
	res.json({ message: 'logout!' });
});

module.exports = router;