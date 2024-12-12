const { User, Token } = require('../models');
const { generateHashPassword, matchPassword, generateAccessToken, generateRefreshToken } = require('../utils/auth');

// User = email, name, password(hashPassword)

// 회원가입
const signupService = async ({ email, name, password }) => {
	
	try {
		
		const existedEmail = await User.findOne({ where: { email: email } });
		const existedName = await User.findOne({ where: { name: name } });
		
		if (existedEmail || existedName) {
			throw new Error('Service : 중복된 이메일과 이름입니다.');
		}
		
		const hashedPassword = await generateHashPassword(password);
		
		const newUser = await User.create({
			email,
			name,
			password: hashedPassword,
		})
		return newUser;
		
	} catch (err) {
		console.error(err);
		throw err;
	}
}

// 로그인 성공 시 토큰 발행
const loginService = async function (userInfo) {
	
	try {
		const existedEmail = await User.findOne({ where: { email: userInfo.email } });
		
		if (existedEmail && await matchPassword(userInfo)) {
			const accessToken = await generateAccessToken(userInfo)
			const refreshToken = await generateRefreshToken(userInfo)
			
			// 존재하면 업데이트, 없으면 생성
			await Token.upsert({
				userId: existedEmail.id,
				token: refreshToken,
			})

			return { accessToken: accessToken, refreshToken: refreshToken };
			
		} else {
			throw new Error ('Service : 이메일과 비밀번호를 다시 확인해주세요.')
		}
		
	} catch (err) {
		console.error(err.message);
		throw err;
	}
}

module.exports = {signupService, loginService};