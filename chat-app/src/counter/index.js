const SocketIO = require('../socket/index');

class CounterTest {
	static counter = 0;
	
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
		console.log('Successfully connected to a counter socket');

		socket.on('increment', function() {
			CounterTest.counter += 1;
			console.log(CounterTest.counter);
			socket.emit('updateCount', CounterTest.counter);
		});
	}
}

module.exports = CounterTest;