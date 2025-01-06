const express = require('express');
const router = express.Router();
const { userInfo, userPosts, userDelete, updatePassword } = require('../controllers/mypageController');
const { authMiddleware } = require('../middlewares/authMiddleware');


router.use(authMiddleware);

// 개인정보
router.get('/', userInfo);

// 작성 게시글
router.get('/posts', userPosts);

// 마이페이지 - 비밀번호 수정
router.put('/password', updatePassword);

// 마이페이지 - 탈퇴
router.post('/', userDelete);

module.exports = router;