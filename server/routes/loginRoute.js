const express = require('express');
const router = express.Router();

const {signup,login} = require('../controllers/loginController');

// 회원가입
router.post('/signup', signup);

// 로그인
router.post('/', login);

// 로그아웃
router.delete('/logout', (req, res) => {
	res.json({ message: 'logout!' });
});

module.exports = router;