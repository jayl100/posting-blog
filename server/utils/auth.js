const bcrypt = require('bcrypt');
const saltRounds = 10;

// bcrypt 암호화
const generateHashPassword = async ({ password }) => {
	
	try {
		const passwordString = password.toString();
		const salt = await bcrypt.genSalt(saltRounds);
		
		return await bcrypt.hash(passwordString, salt);
		
	} catch (err) {
		throw new Error('generateHashPassword', err);
	}
}

module.exports = generateHashPassword;