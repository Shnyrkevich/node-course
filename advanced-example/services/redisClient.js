const redis = require('redis');
const keys = require('../config/keys');
const util = require('util');

class RedisClient {
	static #client = null;

	constructor() {}

	static getInstance() {
		if (!RedisClient.#client) {
			RedisClient.#client = RedisClient.#initConnection();
		}
		return RedisClient.#client;
	}

	static #initConnection() {
		try {RedisClient
			const client = redis.createClient(keys.redisURL);
			client.get = util.promisify(client.get);
			client.hget = util.promisify(client.hget);
			return client;
		} catch(e) {
			console.log('An error occured while connecting to Redis');
		}
	}

	static clearCash(hashKey) {
		try {
			RedisClient.#client.del(hashKey)
		} catch(e) {
			console.log('An error occured while deleting to Redis');
		}
	}
}

module.exports = RedisClient;