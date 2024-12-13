const { User } = require('../models');
const { generateHashPassword } = require('../utils/auth');
const bcrypt = require('bcrypt');

// delete: 탈퇴하기
const userDeleteService = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      console.log('사용자를 찾을 수 없습니다.');
      return;
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
      console.log('현재 비밀번호를 다시 확인해주세요.');
      return;
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