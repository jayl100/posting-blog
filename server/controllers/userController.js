const { signupService, loginService, logoutService } = require('../services/userService');
const { StatusCodes } = require('http-status-codes');
const { accessToken } = require("../utils/auth");

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
		const token = await loginService(userInfo);
		
		if (token) {
			console.log('token : ', token)
			res.header('Authorization', `Bearer ${ token.accessToken }`);
			res.cookie('refreshToken', token.refreshToken, {
				httpOnly: true,
			});
			return res.status(StatusCodes.OK).send('로그인 성공');
		}
		
	} catch (err) {
		if (err.message === 'Service : 이메일과 비밀번호를 다시 확인해주세요.') {
			return res.status(StatusCodes.BAD_REQUEST).send('Controller: fail login');
		}
		console.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('서버 에러');
	}
}

const logout = async (req, res) => {
	try {
		const accessToken = req.headers.authorization;
		
		if (accessToken) {
			const refreshToken = req.headers.cookie;
			await logoutService(refreshToken);
			
			return res.status(StatusCodes.OK).send('로그아웃 성공');
		}
		return res.status(StatusCodes.BAD_REQUEST).send('Controller: fail logout');
		
	} catch (err) {
		console.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('서버 에러');
		
	}
}


module.exports = { signup, login, logout };

// 필요사항
// - 동일한 email, name이 있을 경우 회원가입 제한.
// - 필드 안채워졌을때 대응 필요.