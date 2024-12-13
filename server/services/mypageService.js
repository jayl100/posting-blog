const { User, Posts } = require('../models');

// delete: 탈퇴하기
const userDeleteService = async (userId) => {
  try {
    await Posts.findAll({where: {userId: userId}});
    return await User.destroy({where: {id: userId}});


  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {userDeleteService};