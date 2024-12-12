const { User } = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcrypt');
const { env } = require("process");
const saltRounds = 10;

// bcrypt = 계정 암호
// crypto = 토큰

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

// 로그인 시 비밀번호 매칭
const matchPassword = async ({ email, password }) => {
	
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

// 토큰 생성
const generateAccessToken = async (id) => {
	try {
		const data = { id: id };
		const token = jwt.sign(data, process.env.JWT_KEY, { expiresIn: '1d', issuer: process.env.JWT_ISUER });
		
		return token;
		
	} catch (err) {
		throw new Error('accessToken', err);
	}
}

// 리프레시 토큰 생성
const generateRefreshToken = async (id) => {
	try {
		const data = { id: id };
		const token = jwt.sign(data, process.env.JWT_REFRESH_KEY, { expiresIn: '1d', issuer: process.env.JWT_ISUER });
		
		return token;
		
	} catch (err) {
		throw new Error('refreshToken', err);
	}
}


const verifyAccessToken = async (token, secret) => {
	
	try {
		const payload = jwt.verify(token, secret);
		
		return payload;
	} catch (err) {
		console.error(err);
		throw new Error('Unauthorized');
	}
}

module.exports = { generateHashPassword, matchPassword, generateAccessToken, generateRefreshToken, verifyAccessToken };