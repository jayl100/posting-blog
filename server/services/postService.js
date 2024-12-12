const { verifyAccessToken } = require("../utils/auth");
const { Posts } = require("../models");


const writeService = async (token, contents) => {
	try {
		const payload = await verifyAccessToken(token, process.env.JWT_KEY);
		
		const newContent = await Posts.create({
			title: contents.title,
			content: contents.content,
			userId: payload.id,
		})
		return newContent;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const deleteService = async (id, token) => {
	
	try {
		const payload = await verifyAccessToken(token, process.env.JWT_KEY);
		const matchPost = await Posts.findOne({ where: { id: id, userId: payload.id } });
		if (matchPost) {
			return await Posts.destroy({ where: { id: id } });
		}
		
	} catch (err) {
		console.error(err);
		throw err;
	}
}

module.exports = { writeService, deleteService }