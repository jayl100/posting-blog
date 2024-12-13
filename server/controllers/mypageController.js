const { StatusCodes } = require('http-status-codes');
const { User, Posts } = require('../models');
const { userDeleteService, updatePasswordService } = require('../services/mypageService');

// get: 회원 정보
const userInfo = async (req, res) => {

  try {
    const authUser = await req.payload;
    const userPage = await User.findOne({where: {id: authUser.id}});

    if (authUser) {
      return res.status(StatusCodes.OK).json(userPage);
    }

    return res.status(StatusCodes.NOT_FOUND).json({message: '존재하지 않은 회원입니다.'});

  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('서버 에러');
  }
};

// get: 내 게시글
const userPosts = async (req, res) => {
  try {
    const authUser = await req.payload;
    const myPosts = await Posts.findAll({where: {userId: authUser.id}});

    if (authUser) {
      return res.status(StatusCodes.OK).json(myPosts);
    }

    return res.status(StatusCodes.OK).json([]);

  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('서버 에러');
  }
};

// delete: 탈퇴
const userDelete = async (req, res) => {
  try {
    const authUser = await req.payload;
    const userInfo = await User.findOne({where: {id: authUser.id}});

    if (authUser) {
      await userDeleteService(userInfo.id)
      return res.status(StatusCodes.OK).json({message: '회원탈퇴가 완료되었습니다.'});
    }

    return res.status(StatusCodes.NOT_FOUND).json({message: '회원정보를 다시 확인해주세요.'})

  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('서버 에러');
  }
};

// put: 비밀번호 재설정
const updatePassword = async (req, res) => {
  try {
    const passwords = await req.body; // oldPassword, newPassword
    const authUser = await req.payload;

    if (authUser && passwords) {
      await updatePasswordService(authUser, passwords)
      return res.status(StatusCodes.CREATED).json({message: '비밀번호가 성공적으로 변경되었습니다.'});
    }

    return res.status(StatusCodes.BAD_REQUEST).json({message: '비밀번호 재설정에 실패했습니다.'})

  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('서버 에러');
  }
};

module.exports = { userInfo, userPosts, userDelete, updatePassword };