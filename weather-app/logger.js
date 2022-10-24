import pino from 'pino';

export default class Logger {
	logger;

	constructor(source) {
		this.logger = pino().child({ source });
	}

	init() {
		return this.logger;
	}
}