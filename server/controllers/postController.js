const { StatusCodes } = require("http-status-codes");
const { User, Posts } = require("../models");
const { writeService, deleteService } = require("../services/postService");
const { verifyAccessToken } = require("../utils/auth");

// 게시글 리스트
const list = async (req, res) => {
	
	try {
		const listUp = await Posts.findAll();
		if (listUp.length > 0) {
			
			return listUp;
		}
		return res.status(StatusCodes.BAD_REQUEST).send('게시글이 없습니다.')
		
	} catch (err) {
		console.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('서버 에러');
	}
}

// 게시글 작성하기
const write = async (req, res) => {
	
	try {
		const accessToken = req.headers.authorization;
		const contents = req.body;
		
		if (accessToken && contents) {
			
			await writeService(accessToken, contents);
			
			return res.status(201).send("게시글이 생성되었습니다.");
		}
		return res.status(StatusCodes.BAD_REQUEST).send('게시글 생성에 오류가 발생했습니다.')
	} catch (err) {
		console.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('서버 에러');
	}
}

// 게시글 삭제하기
const deleting = async (req, res) => {
	
	const { id } = req.params;
	const accessToken = req.headers.authorization;
	
	try {
		if (id && accessToken) {

			await deleteService(id, accessToken)
			
			return res.status(StatusCodes.OK).send('게시글이 삭제되었습니다.')
		}

		return res.status(StatusCodes.BAD_REQUEST).send('게시글을 삭제하는데 오류가 발생했습니다.')
		
	} catch (err) {
		console.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('서버 에러');
	}
}

module.exports = { list, write, deleting }