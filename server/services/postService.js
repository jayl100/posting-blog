const { Posts } = require('../models');
const { StatusCodes } = require('http-status-codes');
const appError = require('../utils/appError');


const postWriteService = async (userId, contents) => {
  const { title, content } = contents;

  try {
    if (!userId) {
      throw new appError('로그인이 필요합니다.', StatusCodes.UNAUTHORIZED);
    }

    const newContent = await Posts.create({
      title: title, content: content, userId: userId,
    });

    if (!newContent) {
      throw new appError('게시글 생성에 오류가 발생했습니다.', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    return newContent;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

const postModifyService = async (id, userId, contents) => {
  const { title, content } = contents;

  try {
    const matchPost = await Posts.findOne({ where: { id: id, userId: userId } });

    if (!matchPost) {
      throw new appError('존재하지 않은 게시글 입니다.', StatusCodes.NOT_FOUND);
    }

    // 매치된 포스트 false
    if (matchPost.userId !== userId) {
      throw new appError('게시글의 수정 권한이 없습니다.', StatusCodes.FORBIDDEN);
    }

    const updatedPost = await matchPost.update({
      title: title,
      content: content,
    });
    return updatedPost;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

const postDeleteService = async (id, userId) => {
  try {
    const matchPost = await Posts.findOne({ where: { id: id, userId: userId } });

    if (!matchPost) {
      throw new appError('존재하지 않은 게시글 입니다.', StatusCodes.NOT_FOUND);
    }

    // 매치된 포스트 false
    if (matchPost.userId !== userId) {
      throw new appError('게시글의 삭제 권한이 없습니다.', StatusCodes.FORBIDDEN);
    }

    return await Posts.destroy({ where: { id: id, userId: userId } });

  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { postWriteService, postDeleteService, postModifyService };