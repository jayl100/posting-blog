const { StatusCodes } = require('http-status-codes');
const { User, Posts } = require('../models');
const { userDeleteService, updatePasswordService } = require('../services/mypageService');
const appError = require('../utils/appError');

// get: 회원 정보
const userInfo = async (req, res, next) => {

  try {
    const authUser = await req.payload;
    const userPage = await User.findOne({ where: { id: authUser.id } });

    if (!authUser) {
      throw new appError('회원정보를 찾을 수 없습니다.', StatusCodes.NOT_FOUND);
    }

    return res.status(StatusCodes.OK).json(userPage);

  } catch (err) {
    next(err);
  }
};

// get: 내 게시글
const userPosts = async (req, res, next) => {
  try {
    const authUser = await req.payload;
    const myPosts = await Posts.findAll({ where: { userId: authUser.id } });

    if (!authUser) {
      throw new appError('회원정보를 찾을 수 없습니다.', StatusCodes.NOT_FOUND);
    }

    if (!myPosts) {
      return res.status(StatusCodes.OK).json([]);
    }

    return res.status(StatusCodes.OK).json(myPosts);

  } catch (err) {
    next(err);
  }
};

// delete: 탈퇴
const userDelete = async (req, res, next) => {
  try {
    const authUser = await req.payload;
    const userInfo = await User.findOne({ where: { id: authUser.id } });

    if (!authUser || !userInfo) {
      throw new appError('회원정보를 찾을 수 없습니다.', StatusCodes.NOT_FOUND);
    }

    await userDeleteService(userInfo.id);
    return res.status(StatusCodes.OK).json({ message: '회원탈퇴가 완료되었습니다.' });

  } catch (err) {
    next(err);
  }
};

// put: 비밀번호 재설정
const updatePassword = async (req, res, next) => {
  try {
    const passwords = await req.body; // oldPassword, newPassword
    const authUser = await req.payload;

    if (!authUser || !passwords) {
      throw new appError('비밀번호 재설정에 실패했습니다.', StatusCodes.BAD_REQUEST);
    }

    await updatePasswordService(authUser, passwords);
    return res.status(StatusCodes.OK).json({ message: '비밀번호가 성공적으로 변경되었습니다.' });

  } catch (err) {
    next(err);
  }
};

module.exports = { userInfo, userPosts, userDelete, updatePassword };