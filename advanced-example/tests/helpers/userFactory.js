const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

module.exports = () => {
	return UserModel.create({});
};