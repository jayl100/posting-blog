const { verifyAccessToken } = require('../utils/auth');
const { Posts } = require('../models');


const postWriteService = async (userId, contents) => {
  try {
    const newContent = await Posts.create({
      title: contents.title, content: contents.content, userId: userId,
    });
    return newContent;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const postModifyService = async (id, userId, postInfo) => {
  try {
    const matchPost = await Posts.findOne({ where: { id: id, userId: userId } });

    // 매치된 포스트만 update한다.
    if (matchPost) {
      const updatedPost = await matchPost.update({
        title: postInfo.title,
        content: postInfo.content,
      });
      return updatedPost;
    }
    throw new Error('Service : 포스트가 정상적으로 업데이트 되지 않았습니다.');

  } catch (err) {
    console.error(err);
    throw err;
  }
};

const postDeleteService = async (id, userId) => {
  try {
    if (userId) {
      return await Posts.destroy({ where: { id: id, userId: userId } });
    }
    throw new Error('Service : 포스트가 정상적으로 삭제되지 않았습니다.');

  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { postWriteService, postDeleteService, postModifyService };