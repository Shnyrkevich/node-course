const users = [];

const addUser = ({ id, username, room }) => {
	username = String(username).trim().toLowerCase();
	room = String(room).trim().toLowerCase();

	if (!username || !room) {
		return {
			error: 'Username and room are not required!',
		};
	}

	const isUserExist = users.find((user) => {
		return user.room === room && user.username === username;
	});

	if (isUserExist) {
		return {
			error: 'Username is in use!',
		};
	}

	const user = { id, username, room };
	users.push(user);
	return { user };
};

const removeUser = (userId) => {
	const userIndex = users.findIndex(({ id }) => id === userId);
	if (userIndex) {
		return users.splice(userIndex, 1)[0];
	}
}

const getUser = (userId) => {
	return users.find(({ id }) => id === userId);
}

const getUsersInRoom = (room) => {
	return users.filter(
		(user) => user.room === room
	)
}

module.exports = {
	addUser,
	getUser,
	getUsersInRoom,
	removeUser,
};
