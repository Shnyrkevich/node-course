const SocketIO = require('../socket/index');
const Filter = require('bad-words');
const {
	getUser,
	getUsersInRoom,
	removeUser,
	addUser,
} = require('./users');

class ChatService {
	isConnected = true;

	constructor() {
		this.init()
	}

	init() {
		const socket = SocketIO.getIo();
		socket.on('connection', this.#initActions)
	}

	#initActions(socket) {
		this.isConnected = true;
		
		socket.on('join', ({ username, room }, callback) => {
			const { error, user } = addUser({ id: socket.id, username, room });

			if (error) {
				console.log(error, callback);
				callback(error);
				return;
			}

			socket.join(user.room);

			socket.broadcast.to(room).emit(
				'message',
				{
					value: `${user.username} just joined the chat`,
					username: '', 
				}
			);
			SocketIO.getIo().to(user.room).emit(
				'roomData',
				{ 
					room: user.room,
					users: getUsersInRoom(user.room),
				},
			);

			callback();
		});

		socket.on('sendMessage', ({ value }, callback) => {
			const user = getUser(socket.id);
			SocketIO.getIo().to(user.room).emit('message', { value, username: user.username });	
			callback('Delivered');
		});

		socket.on('disconnect', () => {
			const user = removeUser(socket.id);

			if (user) {
				const currentSoc = SocketIO.getIo().to(user.room);
				currentSoc.emit(
					'message',
					{
						value: `A ${user.username} has left the chat`,
						username: '',
					}
				);
				currentSoc.emit(
					'roomData',
					{ 
						room: user.room,
						users: getUsersInRoom(user.room),
					},
				);
			}	
		});

		socket.on('sendLocation', ({ lat = 0, long = 0 }, callback) => {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit(
				'locationMessage',
				{
					value: `https://google.com/maps?q=${lat},${long}`,
					username: user.username
				}
			);
			callback();
		});
	}
}

module.exports = ChatService;