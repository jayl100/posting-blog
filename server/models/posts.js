'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Posts extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Posts.belongsTo(models.User, {
				foreignKey: 'userId',
				targetKey: 'id',
				as: 'user',
				onDelete: 'CASCADE',
			})
		}
	}
	
	Posts.init({
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	}, {
		sequelize,
		modelName: 'Posts',
		tableName: 'Posts',
	});
	return Posts;
};