const socketio = require('socket.io');

class SocketIo {
	static instance = null; 

	static getIo(server) {
		if (SocketIo.instance) return SocketIo.instance;
		if (!server) return null;
		SocketIo.instance = socketio(server);
		this.initHandlers();
	}

	static initHandlers() {
		SocketIo.instance.on('connection', () => {
			console.log('Socket, new connection');
		})
	}
}

module.exports = SocketIo;
