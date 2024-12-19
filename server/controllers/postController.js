const { StatusCodes } = require('http-status-codes');
const { Posts, User } = require('../models');
const { postWriteService, postDeleteService, postModifyService } = require('../services/postService');
const appError = require('../utils/appError');


// 게시글 리스트
const postList = async (req, res, next) => {
  try {

    const page = parseInt(req.query.page, 5) || 1;
    const limit = parseInt(req.query.limit, 8) || 8;
    const offset = (page - 1) * limit;

    const totalItems = await Posts.count();

    const posts = (await Posts.findAll({
      attributes: [ 'id', 'title', 'content', 'userId', 'createdAt', 'updatedAt' ],
      include: [ {
        model: User,
        as: 'user',
        attributes: [ 'name' ],
      } ],
      order: [ [ 'createdAt', 'DESC' ] ],
      limit: limit,
      offset: offset,
    }));

    const totalPages = Math.ceil(totalItems / limit);

    const modifiedPosts = posts.map(post => {
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

    if (modifiedPosts.length > 0) {
      return res.status(StatusCodes.OK).json({
        data: modifiedPosts,
        meta: {
          totalItems,
          totalPages,
          currentPage: page,
        }
      });
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
const posting = async (req, res, next) => {
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

module.exports = { postList, posting, postDelete, postDetail, postModify };