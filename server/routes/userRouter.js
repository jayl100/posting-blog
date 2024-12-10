const express = require('express');
const router = express.Router();

// 마이페이지 - 회원정보
router.get('/account', (req, res) => {
	res.json({ message: 'get 회원정보 account!' });
});

// 마이페이지 - 비밀번호 수정
router.put('/account', (req, res) => {
	res.json({ message: 'put account!' });
});

// 마이페이지 - 내 게시글 조회
router.get('/account', (req, res) => {
	res.json({ message: 'get 게시글 account!' });
});

// 마이페이지 - 탈퇴
router.delete('/account', (req, res) => {
	res.json({ message: 'delete account!' });
});

module.exports = router;