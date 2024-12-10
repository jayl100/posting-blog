const signupService = require('../services/loginService');

const signup = async (req, res, next) => {
	const userInfo = req.body;
	
	try {
		const user = await signupService(userInfo);
		res.status(200).send(user);
	} catch (error) {
		next(error);
	}
}


module.exports = signup;