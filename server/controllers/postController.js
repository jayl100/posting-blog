const { StatusCodes } = require('http-status-codes');
const { Posts, User } = require('../models');
const { postWriteService, postDeleteService, postModifyService } = require('../services/postService');
const appError = require('../utils/appError');


// 게시글 리스트
const postList = async (req, res, next) => {
  try {
    const posts = await Posts.findAll({
      attributes: [ 'id', 'title', 'content', 'userId', 'createdAt', 'updatedAt' ],
      include: [ {
        model: User,
        as: 'user',
        attributes: [ 'name' ],
      } ]
    });

    const modifiedPosts = posts.map(post => {
      const raw = post.get({ plain: true });

      return {
        id: raw.id,
        title: raw.title,
        name: raw.user.name,
        userId: raw.userId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      };
    });

    console.log(modifiedPosts);


    if (modifiedPosts.length > 0) {
      return res.status(StatusCodes.OK).json(modifiedPosts);
    }

    return res.status(StatusCodes.OK).json([]); // 게시글이 없습니다. 필요

  } catch (err) {
    next(err);
  }
};

// 게시글 디테일
const postDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.findOne({ where: { id: id } });

    if (!post) {
      throw new appError('게시글이 존재하지 않습니다.', StatusCodes.NOT_FOUND);

    }

    return res.status(StatusCodes.OK).json(post);

  } catch (err) {
    next(err);
  }
};

// 게시글 작성하기
const postWrite = async (req, res, next) => {
  try {
    const authUser = await req.payload;
    const contents = req.body;

    if (!contents.title || !contents.content) {
      throw new appError('제목과 내용을 모두 입력해 주세요.', StatusCodes.BAD_REQUEST);
    }

    const createdPost = await postWriteService(authUser.id, contents);
    return res.status(StatusCodes.CREATED).json(createdPost);

  } catch (err) {
    next(err);
  }
};

// 게시글 수정
const postModify = async (req, res, next) => {
  try {
    const { id } = req.params;
    const authUser = await req.payload;
    const contents = req.body;

    if (!contents.title || !contents.content) {
      throw new appError('제목과 내용을 모두 입력해 주세요.', StatusCodes.BAD_REQUEST);
    }

    const updatePost = await postModifyService(id, authUser.id, contents);
    return res.status(StatusCodes.OK).json(updatePost);


  } catch (err) {
    next(err);
  }
};

// 게시글 삭제하기
const postDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const authUser = await req.payload;

    await postDeleteService(id, authUser.id);
    return res.status(StatusCodes.OK).json({ message: '게시글이 삭제되었습니다.' });

    return res.status(StatusCodes.BAD_REQUEST).json({ message: '게시글 삭제에 오류가 발생했습니다.' });

  } catch (err) {
    next(err);
  }
};

module.exports = { postList, postWrite, postDelete, postDetail, postModify };