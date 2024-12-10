const {User} = require('../models');

const signupService = async ({ email, name, password }) => {
	
	const hashedPassword = password;
	
	const newUser = await User.create({
		email, name, password: hashedPassword
	});
	return newUser;
}



module.exports = signupService;