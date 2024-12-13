const express = require('express');
const router = express.Router();
const { postList, postWrite, postDelete, postDetail, postModify } = require('../controllers/postController');
const { authMiddleware } = require('../middlewares/authMiddleware');


// 게시판 리스트
router.get('/', postList);

// 게시글
router.get('/:id', postDetail);

// 글쓰기
router.post('/write', authMiddleware, postWrite);

// 게시글 수정
router.put('/:id', authMiddleware, postModify);

// 게시글 삭제
router.delete('/:id', authMiddleware, postDelete);

module.exports = router;