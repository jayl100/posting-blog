const { User } = require('../models');
const generateHashPassword = require('../utils/auth');

// User = email, name, password(hashPassword)

// 회원가입
const signupService = async ({ email, name, password }) => {
	
	const hashedPassword = await generateHashPassword({ password });
	
	return await User.create({
		email, name, password: hashedPassword
	});
}

module.exports = signupService;