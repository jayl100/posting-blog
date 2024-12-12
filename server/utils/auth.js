const { User } = require('../models');
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

const matchPassword = async ({ email, password }) => {
	// {password} = 1234
	// User.password = hashedPassword
	
	try {
		const matchPerson = await User.findOne({ where: { email } })
		
		if (matchPerson) {
			const match = await bcrypt.compare(password, matchPerson.password);
			
			return match;
		}
		return console.log('not match');
		
	} catch (err) {
		throw new Error('matchPassword', err);
	}
	
}


module.exports = { generateHashPassword, matchPassword };