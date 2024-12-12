const express = require('express');
const router = express.Router();
const { list, write, deleting } = require('../controllers/postController');

// 게시판 리스트
router.get('/', list);

// 글쓰기
router.post('/write', write);

// 게시글
router.get('/:id', (req, res) => {
	res.json({ message: '게시글!' });
});

// 게시글 수정
router.put('/:id', (req, res) => {
	res.json({ message: '게시글 수정!' });
});

// 게시글 삭제
router.delete('/:id', deleting);

module.exports = router;