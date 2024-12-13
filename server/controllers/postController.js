const { StatusCodes } = require('http-status-codes');
const { Posts } = require('../models');
const { postWriteService, postDeleteService, postModifyService } = require('../services/postService');


// 게시글 리스트
const postList = async (req, res) => {

  try {
    const listUp = await Posts.findAll();

    if (listUp.length > 0) {
      return res.status(StatusCodes.OK).json(listUp);
    }
    return res.status(StatusCodes.OK).json([]); // 게시글이 없습니다. 필요

  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
  }
};

// 게시글 디테일
const postDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findOne({ where: { id: id } });

    if (post) {
      return res.status(StatusCodes.OK).json(post);
    }
    return res.status(StatusCodes.NOT_FOUND).json({ message: '해당하는 게시글이 존재하지 않습니다.' });

  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
  }
};

// 게시글 작성하기
const postWrite = async (req, res) => {
  try {
    const authUser = await req.payload;
    const contents = req.body;

    if (authUser.id && contents) {
      const createdPost = await postWriteService(authUser.id, contents);
      return res.status(StatusCodes.CREATED).json(createdPost);
    }
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '게시글 생성에 오류가 발생했습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
  }
};

// 게시글 수정
const postModify = async (req, res) => {
  try {
    const { id } = req.params;
    const authUser = await req.payload;
    const contents = req.body;

    if (id && authUser) {
      const updatePost = await postModifyService(id, authUser.id, contents);
      return res.status(StatusCodes.OK).json(updatePost);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: '요청 정보가 올바르지 않습니다.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
  }
};

// 게시글 삭제하기
const postDelete = async (req, res) => {

  try {
    const { id } = req.params;
    const authUser = await req.payload;

    if (id && authUser) {
      await postDeleteService(id, authUser.id);
      return res.status(StatusCodes.OK).json({ message: '게시글이 삭제되었습니다.' });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '게시글 삭제에 오류가 발생했습니다.' });

  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
  }
};

module.exports = { postList, postWrite, postDelete, postDetail, postModify };