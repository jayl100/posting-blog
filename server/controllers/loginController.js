const signupService = require('../services/loginService');
const { StatusCodes } = require('http-status-codes');

// 회원가입
const signup = async (req, res) => {
	const userInfo = req.body;
	
	try {
		await signupService(userInfo);
		res.status(201).send("가입완료");
		
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
	}
}


module.exports = signup;

// 필요사항
// - 동일한 email, name이 있을 경우 회원가입 제한.
// - 필드 안채워졌을때 대응 필요.