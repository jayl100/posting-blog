'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Posts, {
				foreignKey: 'userId',
				sourceKey: 'id'
			})
		}
	}
	
	User.init({
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	}, {
		sequelize,
		modelName: 'User',
		tableName: 'Users',
		indexes: [
			{
				unique: true,
				fields: ['email', 'name'],
				name: 'uniqueEmailName',
			}
		]
		
	});
	return User;
};