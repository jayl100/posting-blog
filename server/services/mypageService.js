const { User } = require('../models');
const { generateHashPassword } = require('../utils/auth');
const bcrypt = require('bcrypt');
const appError = require('../utils/appError');
const { StatusCodes } = require('http-status-codes');

// delete: 탈퇴하기
const userDeleteService = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new appError('회원정보를 찾을 수 없습니다.', StatusCodes.NOT_FOUND);
    }

    return await User.destroy({where: {id: userId}});

  } catch (err) {
    console.error(err);
    throw err;
  }
};

// put: 비밀번호 재설정
const updatePasswordService = async (authUser, password) => {
  const { oldPassword, newPassword } = password;

  try {
    const matchUser = await User.findOne({ where: { id: authUser.id } }); // auth유저 찾기
    const matchPassword = await bcrypt.compare(oldPassword, matchUser.password); // auth유저의 기존 비번 확인

    if (!matchPassword) {
      throw new appError('기본 비밀번호를 확인해 주세요.', StatusCodes.UNAUTHORIZED);
    }

    const newHashedPassword = await generateHashPassword(newPassword); // 새 비번 암호화

    const updatePasswordUser = await matchUser.update({ password: newHashedPassword }); // 새 비번 업데이트
    return updatePasswordUser;

  } catch (err) {
    console.error(err);
    throw err;
  }
};


module.exports = { userDeleteService, updatePasswordService };