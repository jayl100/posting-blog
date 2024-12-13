const express = require('express');
const router = express.Router();
const { userInfo, userPosts, userDelete } = require('../controllers/mypageController');
const { authMiddleware } = require('../middlewares/authMiddleware');


router.use(authMiddleware);

// 개인정보
router.get('/mypage', userInfo);

// 작성 게시글
router.get('/mypage/posts', userPosts);

// 마이페이지 - 비밀번호 수정
router.put('/mypage/password', (req, res) => {
  res.json({ message: 'put account!' });
});

// 마이페이지 - 탈퇴
router.delete('/mypage', userDelete);

module.exports = router;