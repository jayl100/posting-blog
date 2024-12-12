const { signupService, loginService } = require('../services/loginService');
const { StatusCodes } = require('http-status-codes');

// 회원가입
const signup = async (req, res) => {
	const userInfo = req.body;
	
	try {
		if (await signupService(userInfo)) {
			return res.status(201).send("가입완료");
		}
	} catch (err) {
		if (err.message === 'Service : 중복된 이메일과 이름입니다.') {
			return res.status(StatusCodes.BAD_REQUEST).send('Controller: 중복된 이메일과 이름입니다.');
		}
		console.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('서버 에러');
	}
}

const login = async (req, res) => {
	const userInfo = req.body; // email, password
	
	try {
		if (await loginService(userInfo)) {
			return res.status(200).send('로그인 성공');
		}
	} catch (err) {
		if (err.message === 'Service : 이메일과 비밀번호를 다시 확인해주세요.') {
			return res.status(StatusCodes.BAD_REQUEST).send('Controller: fail login');
		}
		console.error();
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('서버 에러');
	}
}


module.exports = { signup, login };

// 필요사항
// - 동일한 email, name이 있을 경우 회원가입 제한.
// - 필드 안채워졌을때 대응 필요.