const express = require('express');
const router = express.Router();

// 마이페이지
router.get('/account', (req, res) => {
	res.json({ message: 'get 회원정보 account!' });
});

// 마이페이지 - 비밀번호 수정
router.put('/account', (req, res) => {
	res.json({ message: 'put account!' });
});

// 마이페이지 - 탈퇴
router.delete('/account', (req, res) => {
	res.json({ message: 'delete account!' });
});

module.exports = router;