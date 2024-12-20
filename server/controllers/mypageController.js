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

    return res.status(StatusCodes.OK).json({
      id: userPage.id,
      email: userPage.email,
      name: userPage.name,
    });

  } catch (err) {
    next(err);
  }
};

// get: 내 게시글
const userPosts = async (req, res, next) => {
  try {
    const authUser = await req.payload;
    const myPosts = await Posts.findAll({
      attributes: [ 'id', 'title', 'content', 'userId', 'createdAt', 'updatedAt' ],
      include: [ {
        model: User,
        as: 'user',
        attributes: [ 'name' ],
      } ],
      order: [ [ 'createdAt', 'DESC' ] ],
      where: { userId: authUser.id }
    });

    const modifiedPosts = myPosts.map(post => {
      const raw = post.get({ plain: true }); // 배열 안 복잡하게 꼬여있는 요소 빼내기

      return {
        id: raw.id,
        title: raw.title,
        name: raw.user.name,
        userId: raw.userId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      };
    });

    if (!authUser) {
      throw new appError('회원정보를 찾을 수 없습니다.', StatusCodes.NOT_FOUND);
    }

    if (!myPosts) {
      return res.status(StatusCodes.OK).json([]);
    }

    console.log(myPosts);
    return res.status(StatusCodes.OK).json(modifiedPosts);

  } catch (err) {
    next(err);
  }
};

// delete: 탈퇴
const userDelete = async (req, res, next) => {
  try {
    const password = await req.body.password;
    const authUser = await req.payload; // { id: 19, iat: 1734183358, exp: 1734269758, iss: 'jay' }

    if (!password) {
      throw new appError('비밀번호를 입력해 주세요.', StatusCodes.BAD_REQUEST);
    }

    await userDeleteService(authUser, password);
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

    if (!passwords) {
      throw new appError('비밀번호 재설정에 실패했습니다.', StatusCodes.BAD_REQUEST);
    }

    await updatePasswordService(authUser, passwords);
    return res.status(StatusCodes.OK).json({ message: '비밀번호가 성공적으로 변경되었습니다.' });

  } catch (err) {
    next(err);
  }
};

module.exports = { userInfo, userPosts, userDelete, updatePassword };